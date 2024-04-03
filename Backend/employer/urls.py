from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter, DefaultRouter
from .views import EmployerViewSet, JobPostingViewSet
from django.urls import include

router = DefaultRouter()
router.register(r'employer', EmployerViewSet, basename='employer')
router.register(r'jobs', JobPostingViewSet, basename='jobs')

urlpatterns = [
    path('', include(router.urls)),
]
