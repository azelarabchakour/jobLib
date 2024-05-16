from rest_framework import serializers
from .models import Employee
from authentication.models import User
from authentication.serializers import UserCreateSerializer,UserUpdateSerializer
from rest_framework.serializers import Serializer, FileField
from authentication.serializers import UserSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Employee
        fields = ['id', 'user', 'rating', 'resume']

class EmployeeCustomSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Employee
        fields = ['id', 'user', 'rating']

class UpdateEmployeeSerializer(serializers.ModelSerializer):
    #user = UserCreateSerializer()
    user = UserUpdateSerializer()
    class Meta:
        model = Employee
        fields = ['user','rating','resume']

