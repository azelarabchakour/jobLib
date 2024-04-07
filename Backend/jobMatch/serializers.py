from rest_framework import serializers
from .models import JobPosting
from .models import JobApplication
from .models import Analytics
from employee.serializers import EmployeeSerializer, EmployeeCustomSerializer
from employer.serializers import JobPostingSerializer

class JobApplicationSerializer(serializers.ModelSerializer):
    employee = EmployeeCustomSerializer(read_only=True)
    class Meta:
        model = JobApplication
        fields = ['id', 'application_date', 'applicationStatus', 'employee', 'job_posting','matchPercentage']

class CreateJobApplicationSerializer(serializers.ModelSerializer):
    #employee = EmployeeCustomSerializer()
    class Meta:
        model = JobApplication
        fields = ['id', 'application_date', 'applicationStatus', 'employee', 'job_posting','matchPercentage']

class AnalyticsSerializer(serializers.ModelSerializer):
    #employee = EmployeeSerializer()
    #jobPosting = JobPostingSerializer()
    class Meta:
        model = Analytics
        fields = ['id', 'employee', 'jobPosting','matchPercentage']