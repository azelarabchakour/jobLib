from django.db import models

# Create your models here.

class User(models.Model):
    firstName = models.CharField(max_length=200, null=True)
    lastName = models.CharField(max_length=200, null=True)
    email =models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    cv = models.FileField(upload_to='files/')

class JobDescription(models.Model):
    title = models.CharField(max_length=200, null=True)
    user = models.ForeignKey('User', null=True,on_delete=models.SET_NULL)
