from django.db import models
from employer.models import JobPosting
from employee.models import Employee


# Create your models here.

class JobApplication(models.Model):
    application_date = models.DateField()
    applicationStatus = models.CharField(max_length=255, choices=[
        ('APPLIED', 'Applied'), #default status when the employee apply to a job
        ('ACCEPTED', 'accepted'), #when the employer accept the employee
        ('REFUSED', 'refused'), #when the employer refuse the employee
        ('TAKEN', 'Taken by other Employee'), #when the employer accept other employee
        ('CANCELED', 'Job is canceled or deleted by the Employer'), #when the employer canceled or removed the job
    ])
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='applications')
    job_posting = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name='applications')
    matchPercentage = models.FloatField(null=True)

    def __str__(self):
        return f'{self.employee} - {self.job_posting.jobTitle}'
    
class Analytics(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='analytics')
    jobPosting = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name='analytics')
    matchPercentage = models.FloatField()
    appliedOrNot = models.BooleanField(default=False)