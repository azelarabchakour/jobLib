from django.db import models
from django.conf import settings

# Create your models here.

class Employer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return self.user.full_name
    
class JobPosting(models.Model):
    jobTitle = models.CharField(max_length=255)
    jobDescription = models.TextField()
    salaryMin = models.IntegerField()
    salaryMax = models.IntegerField()
    jobStatus = models.CharField(max_length=255, choices=[
        ('POSTED', ''), #0- default status when the employer post the job
        ('INTERVIEW', ''), #1- when the employer is interviewing the candidates
        ('HOLD', ''), #2- when the employer accept one candidate and wait for him to confirm
        ('DONE', ''), #3- when the candidate accepted confirmed the job and start it
        ('CANCELED', ''), #4- when the employer cancel the job
    ])
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='jobPostings')

    def __str__(self):
        return self.jobTitle