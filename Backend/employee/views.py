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
from django.core.exceptions import ObjectDoesNotExist

#--------- AI Imports---------------
import PyPDF2
from gensim.models.doc2vec import Doc2Vec
import numpy as np
from numpy.linalg import norm
import re

#-----------------------------------
import os
from django.conf import settings

# Create your views here.

#--------------------------------------------- AI STUFF ----------------------------------------------------------
@api_view()
def home(request):
    employee = Employee.objects.get(
            user_id = request.user.id
    )
    serializer = EmployeeSerializer(employee)
    #resume = employee.resume.name
    resume_path = os.path.join(settings.MEDIA_ROOT, employee.resume.name)
    similarity = match(request,resume_path)
    return Response(similarity)


def match(request,resume):
    pdf = PyPDF2.PdfReader(resume)
    resume = ""
    for i in range(len(pdf.pages)):
        pageObj = pdf.pages[i]
        resume += pageObj.extract_text()
    jd = """
        Position: Data Scientist

Company: [Your Company Name]

Location: [Location]

About Us: [Your Company Description]

Job Description:

We are seeking a talented and experienced Data Scientist to join our team. As a Data Scientist, you will be responsible for analyzing complex datasets, deriving actionable insights, and building predictive models to drive business decisions. You will work closely with cross-functional teams to identify opportunities for leveraging data to solve business problems and improve processes.

Responsibilities:

Analyze large datasets to identify trends, patterns, and insights.
Develop predictive models and machine learning algorithms to solve business problems and optimize processes.
Design and implement data pipelines and workflows for data collection, processing, and analysis.
Collaborate with stakeholders to define project objectives, requirements, and success criteria.
Communicate findings and insights to non-technical stakeholders through data visualization and storytelling.
Stay up-to-date with the latest advancements in data science, machine learning, and analytics techniques.
Requirements:

Bachelor's or Master's degree in Computer Science, Statistics, Mathematics, or related field.
Proven experience as a Data Scientist or similar role, with a strong track record of delivering impactful insights and solutions.
Proficiency in programming languages such as Python or R, and experience with data manipulation and analysis libraries (e.g., pandas, numpy, scikit-learn).
Experience with machine learning techniques such as regression, classification, clustering, and deep learning.
Strong problem-solving skills and ability to work with complex, unstructured datasets.
Excellent communication and collaboration skills, with the ability to explain technical concepts to non-technical stakeholders.
Experience with data visualization tools (e.g., Matplotlib, Seaborn, Tableau) is a plus.
Knowledge of big data technologies (e.g., Hadoop, Spark) and cloud platforms (e.g., AWS, Azure) is a plus.
Benefits:

Competitive salary and benefits package
Opportunity to work on cutting-edge projects with a talented team
Professional development and training opportunities
Flexible working hours and remote work options
If you're passionate about leveraging data to drive business decisions and solve complex problems, we'd love to hear from you! Apply now to join our team and make an impact.

Feel free to customize this job description to better fit the specific requirements and culture of your company.
    """
    
    # Apply to CV and JD
    input_CV = preprocess_text(resume)
    input_JD = preprocess_text(jd)

    model = Doc2Vec.load('./AiModels/cv_job_maching.model')
    v1 = model.infer_vector(input_CV.split())
    v2 = model.infer_vector(input_JD.split())
    similarity = 100*(np.dot(np.array(v1), np.array(v2))) / (norm(np.array(v1)) * norm(np.array(v2)))
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
#-----------------------------------------------------------------------------------------------------------------

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


@api_view(['POST','GET'])
def testCV(request):

    if request.method == 'GET':
        return Response({'message': 'This endpoint accepts POST requests only'})

    try:
        employee = Employee.objects.get(user_id=request.user.id)
        serializer = EmployeeSerializer(employee)
        resume_path = os.path.join(settings.MEDIA_ROOT, employee.resume.name)
        #input_text = request.data.get('input_text', None)
        input_text = request.body.decode('utf-8')
    except ObjectDoesNotExist:
        return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    similarity = match(request,resume_path)
    return Response(similarity)

