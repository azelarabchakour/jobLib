from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.hashers import make_password 


from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import UserManager


class CustomUserManager(UserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    firstName = models.CharField(max_length=200, null=True)
    lastName = models.CharField(max_length=200, null=True)
    email =models.CharField(max_length=200, unique=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    cv = models.FileField(upload_to='files/',null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True, null=True)
    last_login = models.DateTimeField(auto_now=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
    
    def get_full_name(self):
        return self.lastName + ' ' + self.firstName

    def __str__(self):
        return self.email

class JobDescription(models.Model):
    title = models.CharField(max_length=200, null=True)
    user = models.ForeignKey('User', null=True,on_delete=models.SET_NULL)
