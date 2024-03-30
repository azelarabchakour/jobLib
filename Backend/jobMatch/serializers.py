from rest_framework import serializers
from .models import JobPosting
from .models import JobApplication
from .models import Analytics
from employee.serializers import EmployeeSerializer
from employer.serializers import JobPostingSerializer

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'application_date', 'applicationStatus', 'employee', 'job_posting']

class AnalyticsSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    jobPosting = JobPostingSerializer()
    class Meta:
        model = Analytics
        fields = ['id', 'employee', 'jobPosting','matchPercentage']