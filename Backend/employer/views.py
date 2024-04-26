import pickle
from joblib import load
from jobMatch.models import JobApplication
from rest_framework import mixins, viewsets, status
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import render
from .models import Employer, JobPosting
from .serializers import EmployerSerializer, JobPostingSerializer, CreateJobPostingSerializer
from jobMatch.models import Analytics
# ------------------- AI STUFF -------------------
# ------------------------------------------------


class EmployerViewSet(ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

    @action(detail=False, methods=['GET', 'PUT', 'PATCH'])
    def me(self, request):
        employer = Employer.objects.get(
            user_id=request.user.id
        )
        if request.method == 'GET':
            serializer = EmployerSerializer(employer)
            return Response(serializer.data)
        elif request.method in ['PUT', 'PATCH']:
            serializer = EmployerSerializer(
                employer, data=request.data, partial=True)  # Use partial=True for PATCH
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class JobPostingViewSet(ModelViewSet):

    def get_queryset(self):
        employer = Employer.objects.get(user_id=self.request.user.id)
        return JobPosting.objects.filter(
            employer_id=employer.id,
        ).exclude(jobStatus='CANCELED')
    # serializer_class = JobPostingSerializer

    def get_serializer_class(self):
        if self.action == 'addJob':
            return CreateJobPostingSerializer
        return JobPostingSerializer

    @action(detail=False, methods=['GET', 'POST'])
    def addJob(self, request):
        employer = Employer.objects.get(user_id=request.user.id)
        serializer = CreateJobPostingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employer=employer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['GET', 'DELETE', 'PUT', 'PATCH'])
    def deleteJob(self, request, pk):
        try:
            jobPosting = JobPosting.objects.get(pk=pk)
        except JobPosting.DoesNotExist:
            return Response({"error": "Job Posting not found."}, status=status.HTTP_404_NOT_FOUND)
        #jobPosting.delete()
        #insted of deleting the job we just mark it as deleted and all the job applications should be marked as canceled
        jobPosting.jobStatus = 'CANCELED'
        jobPosting.save()
        #mark all the job applications as canceled
        jobApplications = JobApplication.objects.filter(jobPosting_id=pk)
        for jobApplication in jobApplications:
            jobApplication.applicationStatus = 'CANCELED'
            jobApplication.save()
        #delete all the matched employees with that job
        analytics = Analytics.objects.filter(jobPosting_id=pk)
        for analytic in analytics:
            analytic.delete()
        return Response({"message": "Job Posting deleted successfully."}, status=status.HTTP_200_OK)

    # @action(detail=True, methods=['GET', 'PUT', 'PATCH'])
    # def getInfos(self, request,pk):
    #     jobPosting = JobPosting.objects.get(pk=pk)
    #     serializer = JobPostingSerializer(jobPosting)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

@api_view()
def acceptApplication(request, pk):
    try:
        jobApplication = JobApplication.objects.get(pk=pk)
    except JobApplication.DoesNotExist:
        return Response({"error": "Job Application not found."}, status=status.HTTP_404_NOT_FOUND)
    jobApplication.applicationStatus = 'ACCEPTED'
    jobApplication.save()
    #mark the jobPosting as DONE
    jobPosting = JobPosting.objects.get(pk=jobApplication.job_posting.id)
    jobPosting.jobStatus = 'DONE'
    jobPosting.save()
    #mark the jobApllication of all other employees as taken
    jobApplications = JobApplication.objects.filter(job_posting=jobPosting.id).exclude(pk=pk)
    for jobApplication in jobApplications:
        jobApplication.applicationStatus = 'TAKEN'
        jobApplication.save()
    return Response({"message": "Job Application status updated successfully."}, status=status.HTTP_200_OK)


@api_view()
def refuseApplication(request, pk):
    try:
        jobApplication = JobApplication.objects.get(pk=pk)
    except JobApplication.DoesNotExist:
        return Response({"error": "Job Application not found."}, status=status.HTTP_404_NOT_FOUND)

    jobApplication.applicationStatus = 'REFUSED'
    jobApplication.save()
    #decrement the number of applications of the jobPosting
    jobPosting = JobPosting.objects.get(pk=jobApplication.job_posting.id)
    jobPosting.numberOfApplicants -= 1
    jobPosting.save()
    return Response({"message": "Job Application status updated successfully."}, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'PATCH'])
def modifyJob(request, pk):
    try:
        jobPosting = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response({"error": "Job Posting not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JobPostingSerializer(jobPosting)
        return Response(serializer.data)
    elif request.method in ['PUT', 'PATCH']: #Update the job posting
        serializer = CreateJobPostingSerializer(jobPosting, data=request.data)
        if serializer.is_valid():
            serializer.save() 
            #After saving the new job posting delete all the job applications and the matches for this jobposting
            jobApplications = JobApplication.objects.filter(job_posting=pk)
            for jobApplication in jobApplications:
                jobApplication.delete()
            analytics = Analytics.objects.filter(jobPosting=pk)
            for match in analytics:
                match.delete()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# @api_view(['GET'])
# def getNumberOfApplicants(request, pk):
#     try:
#         jobPosting = JobPosting.objects.get(pk=pk)
#     except JobPosting.DoesNotExist:
#         return Response({"error": "Job Posting not found."}, status=status.HTTP_404_NOT_FOUND)
#     return Response({"numberOfApplicants": jobPosting.numberOfApplicants}, status=status.HTTP_200_OK)