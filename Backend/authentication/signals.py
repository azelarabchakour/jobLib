from employee.models import Employee
from employer.models import Employer
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_EmployeeAndEmployer_for_new_user(sender, **kwargs):
    if kwargs['created']:
        Employee.objects.create(user=kwargs['instance'])
        Employer.objects.create(user=kwargs['instance'])