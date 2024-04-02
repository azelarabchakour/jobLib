from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from .models import User
from rest_framework import serializers

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        #model = User
        fields = ['id','username','email','password','first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},  # Exclude password from updates
        }

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        #model = User
        fields = ['id','username','email','first_name', 'last_name']
    def validate_email(self, value):
        """
        Override email validation to skip any validation.
        """
        return value
        

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']

    def validate(self, attrs):
        """
        Validate the serializer data.
        """
        return attrs
