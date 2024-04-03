from rest_framework import serializers
from .models import JobPosting, Employer
from authentication.models import User
from authentication.serializers import UserCreateSerializer,UserUpdateSerializer
from authentication.serializers import UserSerializer



class EmployerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Employer
        fields = ['id', 'user', 'contact_info']

class JobPostingSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer(read_only=True)
    class Meta:
        model = JobPosting
        fields = ['id', 'jobTitle', 'jobDescription', 'salaryMin', 'salaryMax', 'jobStatus', 'employer']
        read_only_fields = ['id', 'employer', 'salaryMin', 'salaryMax', 'jobStatus']

class CreateJobPostingSerializer(serializers.ModelSerializer):
    employer = EmployerSerializer(read_only=True)
    class Meta:
        model = JobPosting
        fields = ['id', 'jobTitle', 'jobDescription', 'salaryMin', 'salaryMax', 'jobStatus', 'employer']
        read_only_fields = ['id', 'employer']