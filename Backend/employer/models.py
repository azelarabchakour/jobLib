from django.db import models
from django.conf import settings

# Create your models here.

class Employer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    
class JobPosting(models.Model):
    jobTitle = models.CharField(max_length=255)
    jobDescription = models.TextField()
    salary = models.IntegerField(null=True, blank=True, default=0)
    salaryMin = models.IntegerField(null=True, blank=True)
    salaryMax = models.IntegerField(null=True , blank=True)
    jobStatus = models.CharField(max_length=255, choices=[
        ('POSTED', 'Posted'), #default status when the employer post the job
        ('DONE', 'Done'), #when the job is taken
        ('CANCELED', 'Canceled'), #when the employer cancel or delete the job
    ],default='POSTED')
    level = models.CharField(max_length=255, choices=[
        ('JUNIOR', 'Entry'),
        ('INTERMEDIATE', 'Intermediate'),
        ('SENIOR', 'Senior'),
        ('EXPERT', 'Expert'),
    ],default='ENTRY')
    numberOfApplicants = models.IntegerField(default=0)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='jobPostings')

    def __str__(self):
        return self.jobTitle