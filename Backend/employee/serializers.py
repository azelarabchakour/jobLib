from rest_framework import serializers
from .models import Employee
from authentication.models import User
from authentication.serializers import UserCreateSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()
    class Meta:
        model = Employee
        fields = ['id', 'user', 'rating']