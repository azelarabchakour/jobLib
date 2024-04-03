from django.shortcuts import render
from .models import Employer, JobPosting
from.serializers import EmployerSerializer, JobPostingSerializer, CreateJobPostingSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework import mixins, viewsets, status



class EmployerViewSet(ModelViewSet):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer
    
    @action(detail=False, methods=['GET', 'PUT', 'PATCH'])
    def me(self,request):
        employer = Employer.objects.get(
            user_id = request.user.id
        )
        if request.method == 'GET':
                serializer = EmployerSerializer(employer)
                return Response(serializer.data)
        elif request.method in ['PUT', 'PATCH']:
            serializer = EmployerSerializer(employer, data=request.data, partial=True)  # Use partial=True for PATCH
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)  
    
    
        
class JobPostingViewSet(ModelViewSet):
    queryset = JobPosting.objects.all()
    #serializer_class = JobPostingSerializer
    def get_serializer_class(self):
        if self.action == 'addJob':
                return CreateJobPostingSerializer
        return JobPostingSerializer


    @action(detail=False, methods=['GET','POST'])
    def addJob(self, request):
        employer = Employer.objects.get(user_id=request.user.id)
        serializer = CreateJobPostingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employer=employer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     