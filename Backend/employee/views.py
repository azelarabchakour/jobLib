from django.shortcuts import render
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework import mixins, viewsets, status
from .models import Employee
from .serializers import EmployeeSerializer,UpdateEmployeeSerializer
from employer.models import JobPosting
from employer.serializers import JobPostingSerializer
from jobMatch.models import Analytics, JobApplication
from jobMatch.serializers import AnalyticsSerializer, JobApplicationSerializer
import datetime
from employee.models import Employee
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from authentication.serializers import UserCreateSerializer, UserUpdateSerializer, UserSerializer

from rest_framework import generics

# Create your views here.
@api_view()
def home(request):
    return Response("Hello, world.")

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    @action(detail=False, methods=['GET', 'PUT', 'PATCH'])
    def me(self,request):
        employee = Employee.objects.get(
            user_id = request.user.id
        )
        if request.method == 'GET':
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data)
        elif request.method in ['PUT', 'PATCH']:
            serializer = EmployeeSerializer(employee, data=request.data, partial=True)  # Use partial=True for PATCH
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    def testCv(self, request):
        employee = Employee.objects.get(user_id=request.user.id)
        



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
    user_serializer = UserSerializer(user_instance, data=user_data, partial=True)
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

  
@api_view()
def applicationStatus(request):
    applications = JobApplication.objects.filter(employee=request.user.employee)
    serializer = JobApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


