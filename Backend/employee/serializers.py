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
    
class UpdateEmployeeSerializer(serializers.ModelSerializer):
    #user = UserCreateSerializer()
    user = UserUpdateSerializer()
    class Meta:
        model = Employee
        fields = ['user','rating','resume']

        # def update(self, instance, validated_data):
        #     # Update employee fields

        #     user_data = validated_data.pop('user', {})
        #     user_serializer = UserUpdateSerializer(instance.user, data=user_data, partial=True)

        #     if user_serializer.is_valid(raise_exception=True):
        #         user_serializer.save()

        #     instance.rating = validated_data.get('rating', instance.rating)
        #     instance.resume = validated_data.get('resume', instance.resume)
        #     instance.save()

        #     return instance

