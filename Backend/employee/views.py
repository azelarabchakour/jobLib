from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import mixins, viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from employer.models import JobPosting
from employer.serializers import JobPostingSerializer

# Create your views here.
@api_view()
def home(request):
    return Response("Hello, world.")



class EmployeeViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer



