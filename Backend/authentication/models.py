from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser, PermissionsMixin

# Create your models here.

class User(AbstractUser):
	email = models.EmailField(unique=True)
	role = models.IntegerField(blank=False, null=False, choices=[(0, 'Employee'), (1, 'Employer')])
	#first_name = None
	#last_name = None

