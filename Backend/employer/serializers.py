from rest_framework import serializers
from .models import JobPosting, Employer
from authentication.models import User
from authentication.serializers import UserCreateSerializer,UserUpdateSerializer
from authentication.serializers import UserSerializer
from jobMatch.utils import calculateSalaryEstimation, calculateSalaryEstimationV2
from jobMatch.models import JobApplication
from employee.serializers import EmployeeSerializer


class EmployerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Employer
        fields = ['id', 'user', 'contact_info']

class JobApplicationSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    class Meta:
        model = JobApplication
        fields = ['id', 'application_date', 'applicationStatus', 'employee', 'job_posting','matchPercentage']

class JobPostingSerializer(serializers.ModelSerializer):
    applications = JobApplicationSerializer(many=True, read_only=True)
    employer = EmployerSerializer(read_only=True)
    class Meta:
        model = JobPosting
        fields = ['id', 'jobTitle', 'jobDescription','salary', 'salaryMin', 'salaryMax', 'jobStatus', 'employer','applications','numberOfApplicants']
        read_only_fields = ['id', 'employer', 'salaryMin', 'salaryMax', 'jobStatus','numberOfApplicants']

class CreateJobPostingSerializer(serializers.ModelSerializer):
    applications = JobApplicationSerializer(many=True, read_only=True)
    employer = EmployerSerializer(read_only=True)
    class Meta:
        model = JobPosting
        fields = ['id', 'jobTitle', 'jobDescription','salary', 'salaryMin', 'salaryMax', 'jobStatus', 'employer','applications','numberOfApplicants']
        read_only_fields = ['id', 'employer','salaryMin', 'salaryMax', 'jobStatus','numberOfApplicants']
    
    def create(self, validated_data):
        job_description = validated_data.pop('jobDescription', '')  # Extract job description
        salary_estimation = calculateSalaryEstimationV2(job_description)

        validated_data['jobDescription'] = job_description
        validated_data['jobStatus'] = 'POSTED'
        # Add salary estimation to validated data
        validated_data['salaryMin'] = salary_estimation['min_salary']
        validated_data['salaryMax'] = salary_estimation['max_salary']
        # Call the parent class's create method to save the instance
        return super().create(validated_data)
    

    #this method is not working for now 
    def update(self, instance, validated_data):
        # Extract job description from validated data
        job_description = validated_data.get('jobDescription', instance.jobDescription)

        salary_estimation = calculateSalaryEstimationV2(job_description)
        validated_data['jobDescription'] = job_description
        # Add salary estimation to validated data
        validated_data['salaryMin'] = salary_estimation['min_salary']
        validated_data['salaryMax'] = salary_estimation['max_salary']
        


        # Call the parent class's update method to save the instance
        return super().update(instance, validated_data)
    

    
    