from django.db import models
from employer.models import JobPosting
from employee.models import Employee


# Create your models here.

class JobApplication(models.Model):
    application_date = models.DateField()
    applicationStatus = models.CharField(max_length=255, choices=[
        ('WAIT_FOR_INTERVIEW', 'waiting for the interview'), #0- default status when the employee apply to a job
        ('ACCEPTED_FOR_INTERVIEW', 'accepted for interview'), #1- when the employer accept application and let the employee take to the interview
        ('REFUSED', 'refused'), #1- when the employer refuse application 
        ('ACCEPTED_AFTER_INTERVIEW', 'accepted after interview'), #2- when the employer accept the employee after interview
        ('GOT_THE_JOB', 'got the job'), #3- when the employee confirm the job and start it
        ('HOLD', 'hold'), #2- when the employer accept one of the other employees
        ('REFUSE_AFTER_INTERVIEW', 'refuse after interview'), #3- when the employee refuse the job after interview
        ('JOB_TAKEN', 'job taken'), #4- when the job is taken by an other employee
    ])
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='applications')
    job_posting = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name='applications')

    def __str__(self):
        return f'{self.employee} - {self.job_posting.title}'
    
class Analytics(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='analytics')
    jobPosting = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name='analytics')
    matchPercentage = models.FloatField()