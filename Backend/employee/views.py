from django.shortcuts import render
from jobMatch.utils import calculateSalaryEstimationV2
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework import mixins, viewsets, status
from .models import Employee
from .serializers import EmployeeSerializer, UpdateEmployeeSerializer
from employer.models import JobPosting
from employer.serializers import JobPostingSerializer
from jobMatch.models import Analytics, JobApplication
from jobMatch.serializers import AnalyticsSerializer, JobApplicationSerializer
import datetime
from employee.models import Employee
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from jobMatch.serializers import CreateJobApplicationSerializer

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from authentication.serializers import UserCreateSerializer, UserUpdateSerializer, UserSerializer

from rest_framework import generics
from django.core.exceptions import ObjectDoesNotExist
from employer.models import Employer

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes

from django.http import FileResponse

# --------- AI Imports---------------
import PyPDF2
from gensim.models.doc2vec import Doc2Vec
import numpy as np
from numpy.linalg import norm
import re

from .serializers import EmployeeCustomSerializer

# -----------------------------------
import os
from django.conf import settings

# Create your views here.

# --------------------------------------------- AI STUFF ----------------------------------------------------------


@api_view()
def home(request):
    # employee = Employee.objects.get(
    #     user_id=request.user.id
    # )
    # serializer = EmployeeSerializer(employee)
    # resume = employee.resume.name
    # resume_path = os.path.join(settings.MEDIA_ROOT, employee.resume.name)
    # similarity = match(request, resume_path)
    getMatches(request)  # TEST
    return Response("ok")


def match(request, resume, jd):
    pdf = PyPDF2.PdfReader(resume)
    resume = ""
    for i in range(len(pdf.pages)):
        pageObj = pdf.pages[i]
        resume += pageObj.extract_text()

    # Apply to CV and JD
    input_CV = preprocess_text(resume)
    input_JD = preprocess_text(jd)

    model = Doc2Vec.load('./AiModels/cv_job_maching.model')
    v1 = model.infer_vector(input_CV.split())
    v2 = model.infer_vector(input_JD.split())
    similarity = 100*(np.dot(np.array(v1), np.array(v2))) / \
        (norm(np.array(v1)) * norm(np.array(v2)))
    return similarity


def preprocess_text(text):
    # Convert the text to lowercase
    text = text.lower()

    # Remove punctuation from the text
    text = re.sub('[^a-z]', ' ', text)

    # Remove numerical values from the text
    text = re.sub(r'\d+', '', text)

    # Remove extra whitespaces
    text = ' '.join(text.split())

    return text


# ------------------------------------------------------
def matchCvWithJd(resume, jobDescription):
    pdf = PyPDF2.PdfReader(resume)
    resume = ""
    for i in range(len(pdf.pages)):
        pageObj = pdf.pages[i]
        resume += pageObj.extract_text()

    input_CV = preprocess_text(resume)
    input_JD = preprocess_text(jobDescription)

    model = Doc2Vec.load('./AiModels/cv_job_maching.model')
    v1 = model.infer_vector(input_CV.split())
    v2 = model.infer_vector(input_JD.split())
    similarity = 100*(np.dot(np.array(v1), np.array(v2))) / \
        (norm(np.array(v1)) * norm(np.array(v2)))
    # print("{:.2f}".format(similarity))
    return "{:.2f}".format(similarity)


def getAllJobPostings(userId):
    employer_profile = Employer.objects.get(user_id=userId)
    job_postings = JobPosting.objects.filter(
        jobStatus='POSTED',
    ).exclude(employer=employer_profile)  # Exclude job postings created by the connected user's employer profile
    serializer = JobPostingSerializer(job_postings, many=True)
    # print(serializer.data)
    return serializer.data


def getJobDescription(job_id):
    job = JobPosting.objects.get(pk=job_id)
    # print(job.jobDescription)
    return job.jobDescription


def addMatch(employeeId, jobPostingId, matchPercentage):
    match_data = {
        'matchPercentage': matchPercentage,
        'employee': employeeId,
        'jobPosting': jobPostingId,
    }

    # print(match_data)
    match_serializer = AnalyticsSerializer(data=match_data)
    # print(match_serializer.initial_data)
    if match_serializer.is_valid():
        # print(True)
        match_serializer.save()
    else:
        errors = match_serializer.errors
        print(errors)
    #     return Response(match_serializer.data, status=status.HTTP_201_CREATED)
    # else:
    #     return Response(match_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def testIfAlreadyMatched(employeeId, jobPostingId):
    try:
        match = Analytics.objects.get(
            employee_id=employeeId, jobPosting_id=jobPostingId)
        return False
    except Analytics.DoesNotExist:
        # print(True)
        return True


def testIfHasCv(employeeId):
    employee = Employee.objects.get(pk=employeeId)
    if employee.resume:
        # print("has cv TRUE")
        return True
    return False


def getMatches(request):
    employee = Employee.objects.get(user_id=request.user.id)
    if testIfHasCv(employee.id):
        resume_path = os.path.join(settings.MEDIA_ROOT, employee.resume.name)
        # Add restrictions to not match with his own jobs
        jobs = getAllJobPostings(request.user.id)
        for job in jobs:
            if testIfAlreadyMatched(employee.id, job['id']):
                jobDescription = getJobDescription(job['id'])
                percentage = matchCvWithJd(resume_path, jobDescription)
                addMatch(employee.id, job['id'], percentage)

# -----------------------------------------------------------------------------------------------------------------


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    @action(detail=False, methods=['GET', 'PUT', 'PATCH', 'POST'])
    def me(self, request):
        employee = Employee.objects.get(
            user_id=request.user.id
        )
        if request.method == 'GET':
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data)
        elif request.method in ['PUT', 'PATCH']:
            serializer = EmployeeSerializer(
                employee, data=request.data, partial=True)  # Use partial=True for PATCH
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method in ['POST']:
            serializer = EmployeeSerializer(
                employee, data=request.data, partial=True)  # Use partial=True for PATCH
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    def testCv(self, request):
        employee = Employee.objects.get(user_id=request.user.id)


@parser_classes([MultiPartParser, FormParser])
@api_view(['PATCH', 'PUT', 'GET', 'POST'])
def uploadCv(request):
    employee = Employee.objects.get(user_id=request.user.id)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = EmployeeSerializer(
            employee, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == 'POST':
        # Assuming 'cv' is the name of the file field in the request
        cv_file = request.data.get('cv')

        if not cv_file:
            return Response({'error': 'No CV file provided'}, status=status.HTTP_400_BAD_REQUEST)

        # You may want to save the file to a specific location or process it further

        # Update the Employee object with the file information
        employee.cv = cv_file
        employee.save()

        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PATCH', 'PUT', 'GET'])
def update_employee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if employee.user != request.user:
        return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

    user_data = request.data.get('user', {})  # Extract user data from request
    user_instance = employee.user

    # Update user-related fields if user data is provided
    user_serializer = UserSerializer(
        user_instance, data=user_data, partial=True)
    if user_serializer.is_valid():
        user_serializer.save()
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer = EmployeeSerializer(employee, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MatchedJobsViewSet(viewsets.ModelViewSet):
    def get_queryset(self):  # get the matched jobs of the employee logged in
        getMatches(self.request)
        return Analytics.objects.filter(employee=self.request.user.employee, matchPercentage__gte=50,appliedOrNot=False)

    def get_serializer_class(self):
        return AnalyticsSerializer

    # @action(detail=True, methods=['POST'])
    # def apply(request, pk):
    #     try:
    #         job_posting = JobPosting.objects.get(pk=pk)
    #     except JobPosting.DoesNotExist:
    #         return Response({"error": "Job posting not found."}, status=status.HTTP_404_NOT_FOUND)

    #     # Assuming you have appropriate validation logic for the applicationStatus field
    #     application_status = 'WAIT_FOR_INTERVIEW'
    #     #jobPosting = JobPosting.objects.get(pk=pk)
    #     application_data = {
    #         'application_date': datetime.date.today(),
    #         'applicationStatus': application_status,
    #         'employee': request.user.employee.id,
    #         'job_posting': pk
    #     }

    #     application_serializer = JobApplicationSerializer(data=application_data)
    #     if application_serializer.is_valid():
    #         application_serializer.save()
    #         return Response(application_serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(application_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def matchedJobDetails(request, pk):
    matchedJob = JobPosting.objects.get(id=pk)
    # matchedJob = Analytics.objects.filter(employee=request.user.employee,jobposting=pk)
    serializer = JobPostingSerializer(matchedJob)
    return Response(serializer.data)


@api_view(['POST', 'GET'])
def apply(request, pk):
    try:
        job_posting = JobPosting.objects.get(pk=pk)
        employee = Employee.objects.get(user_id=request.user.id)
        employeSerializer = EmployeeCustomSerializer(employee)
        analytics = Analytics.objects.get(employee=employee.id, jobPosting=pk)
    except JobPosting.DoesNotExist:
        return Response({"error": "Job posting not found."}, status=status.HTTP_404_NOT_FOUND)

    application_status = 'APPLIED'
    application_data = {
        'application_date': datetime.date.today(),
        'applicationStatus': application_status,
        'employee': employee.id,
        'job_posting': pk,
        'matchPercentage': analytics.matchPercentage
    }

    application_serializer = CreateJobApplicationSerializer(data=application_data)
    if application_serializer.is_valid():
        analytics.appliedOrNot = True
        analyticsJson = AnalyticsSerializer(analytics)
        analyticsSerializer = AnalyticsSerializer(analytics,data=analyticsJson.data, partial=True)
        if analyticsSerializer.is_valid():
            analyticsSerializer.save()
            application_serializer.save()
            #increment the number of applicant for a jobPosting
            job_posting.numberOfApplicants += 1
            job_posting.save()
            return Response(application_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(analyticsSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(application_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def applicationStatus(request):
    applications = JobApplication.objects.filter(
        employee=request.user.employee)
    serializer = JobApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
def testCV(request):

    if request.method == 'GET':
        return Response({'message': 'This endpoint accepts POST requests only'})
    try:
        employee = Employee.objects.get(user_id=request.user.id)
        serializer = EmployeeSerializer(employee)
        resume_path = os.path.join(settings.MEDIA_ROOT, employee.resume.name)
        # input_text = request.data.get('input_text', None)
        input_text = request.body.decode('utf-8')
    except ObjectDoesNotExist:
        return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)


    similarity = match(request, resume_path, input_text)
    estimation = calculateSalaryEstimationV2(input_text)
    data = {
        'estimation': estimation,
        'similarity': similarity
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view()
def getCv(request,pk):
    try:
        employee = Employee.objects.get(id=pk)
        serializer = EmployeeSerializer(employee)
        resume_path = os.path.join(settings.MEDIA_ROOT, employee.resume.name)
        return FileResponse(open(resume_path, 'rb'), as_attachment=True)
    except ObjectDoesNotExist:
        return Response({'error': 'CV not found'}, status=status.HTTP_404_NOT_FOUND)
    
