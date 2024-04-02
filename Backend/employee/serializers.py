from rest_framework import serializers
from .models import Employee
from authentication.models import User
from authentication.serializers import UserCreateSerializer
from rest_framework.serializers import Serializer, FileField

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer()
    class Meta:
        model = Employee
        fields = ['id', 'user', 'rating', 'resume']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = self.fields['user']
            user_instance = instance.user
            user_serializer.update(user_instance, user_data)

        instance.rating = validated_data.get('rating', instance.rating)
        instance.resume = validated_data.get('resume', instance.resume)
        
        instance.save()
        return instance
