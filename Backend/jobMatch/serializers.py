from rest_framework import serializers
from .models import JobPosting
from .models import JobApplication
from .models import Analytics


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'application_date', 'applicationStatus', 'employee', 'job_posting']

class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analytics
        fields = ['id', 'employee', 'jobPosting','matchPercentage']