from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser, PermissionsMixin

# Create your models here.

class User(AbstractUser):
	email = models.EmailField(unique=True)

