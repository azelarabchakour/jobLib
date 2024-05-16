from employee.models import Employee
from employer.models import Employer
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_EmployeeOrEmployer_for_new_user(sender, instance, created, **kwargs):
    if created:
        if instance.role == 0:  # Check if user role is Employee
            Employee.objects.create(user=instance)
        elif instance.role == 1:  # Check if user role is Employer
            Employer.objects.create(user=instance)