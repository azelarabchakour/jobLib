from django.db import models
from django.conf import settings

# Create your models here.
class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(blank=True, null=True)  # Allows for ratings but avoids empty values

    def __str__(self):
        return self.user.full_name