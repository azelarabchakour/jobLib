from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import mixins, viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from employer.models import JobPosting
from employer.serializers import JobPostingSerializer
from jobMatch.models import Analytics, JobApplication
from jobMatch.serializers import AnalyticsSerializer, JobApplicationSerializer
import datetime
from rest_framework import status


# Create your views here.
@api_view()
def home(request):
    return Response("Hello, world.")



class EmployeeViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class MatchedJobsViewSet(viewsets.ModelViewSet):
    def get_queryset(self): #get the matched jobs of the employee logged in
        return Analytics.objects.filter(employee=self.request.user.employee, matchPercentage__gte=50)
    
    def get_serializer_class(self):
        return AnalyticsSerializer

@api_view()
def matchedJobDetails(request, pk):
    matchedJob = JobPosting.objects.get(id=pk)
    #matchedJob = Analytics.objects.filter(employee=request.user.employee,jobposting=pk)
    serializer = JobPostingSerializer(matchedJob)
    return Response(serializer.data)


@api_view()
def apply(request, pk):
    try:
        job_posting = JobPosting.objects.get(pk=pk)
    except JobPosting.DoesNotExist:
        return Response({"error": "Job posting not found."}, status=status.HTTP_404_NOT_FOUND)

    # Assuming you have appropriate validation logic for the applicationStatus field
    application_status = 'WAIT_FOR_INTERVIEW'
    #jobPosting = JobPosting.objects.get(pk=pk)
    application_data = {
        'application_date': datetime.date.today(),
        'applicationStatus': application_status,
        'employee': request.user.employee.id,
        'job_posting': pk
    }

    application_serializer = JobApplicationSerializer(data=application_data)
    if application_serializer.is_valid():
        application_serializer.save()
        return Response(application_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(application_serializer.errors, status=status.HTTP_400_BAD_REQUEST)





