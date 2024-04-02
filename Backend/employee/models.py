from django.db import models
from django.conf import settings

# Create your models here.
class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(blank=True, null=True)  # Allows for ratings but avoids empty values
    resume = models.FileField(upload_to='resumes/%Y/%m/%d/', blank=True, null=True)  # Add a file field for the resume

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'