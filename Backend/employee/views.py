from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from rest_framework import mixins, viewsets, status
from .models import Employee
from .serializers import EmployeeSerializer
from employer.models import JobPosting
from employer.serializers import JobPostingSerializer
from jobMatch.models import Analytics, JobApplication
from jobMatch.serializers import AnalyticsSerializer, JobApplicationSerializer
import datetime
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response


# Create your views here.
@api_view()
def home(request):
    return Response("Hello, world.")



class EmployeeViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    parser_classes = (JSONParser, MultiPartParser,FormParser)

    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        return Response(EmployeeSerializer(request.user.employee).data)

    #----------------------------------------------------------------
    @action(detail=False, methods=['put'])
    def cvUp(self,request,pk=None):
        user = request.user
        employee = user.employee
        serialiser = EmployeeSerializer(employee, data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_200_OK)
        else:
            return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


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


#----------------------------------------TESTING---------------------------------------------------------------
# @api_view(['POST'])
# def uploadCv(request):
#     if request.method == 'POST':
#         serializer = FileUploadSerializer(data=request.data)
#         if serializer.is_valid():
#             # Get the current user
#             user = request.user

#             # Save the uploaded file associated with the current user
#             employee = Employee.objects.get(user=user)
#             employee.resume = request.data['resume']
#             employee.save()

#             return Response({'message': 'Resume uploaded successfully'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class FileUploadView(APIView):
#     def post(self, request, format=None):
#         parser_classes = [FileUploadParser]
#         serializer = FileUploadSerializer(data=request.data)
#         if serializer.is_valid():
#             # Get the current user
#             user = request.user
            
#             # Get or create the Employee instance associated with the current user
#             employee, created = Employee.objects.get_or_create(user=user)
            
#             # Update the resume field of the Employee instance with the uploaded file
#             employee.resume = request.data['resume']
#             employee.save()
            
#             return Response({'status': 'File uploaded and associated with the current user'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class UploadViewSet(ViewSet):
#     serializer_class = FileUploadSerializer

#     def list(self, request):
#         return Response({"message": "GET API"})

#     def create(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             file_uploaded = serializer.validated_data.get('file_uploaded')
#             content_type = file_uploaded.content_type

#             user = request.user
#             employee, created = Employee.objects.get_or_create(user=user)
#             employee.resume = file_uploaded
#             employee.save()

#             response = "POST API and you have uploaded a {} file".format(content_type)
#             return Response({"message": response})
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
