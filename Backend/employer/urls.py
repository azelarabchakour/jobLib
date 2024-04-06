from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter, DefaultRouter
from .views import EmployerViewSet, JobPostingViewSet
from django.urls import include
from . import views
router = DefaultRouter()
router.register(r'employer', EmployerViewSet, basename='employer')
router.register(r'jobs', JobPostingViewSet, basename='jobs')

urlpatterns = [
    path('', include(router.urls)),
    path('applications/<int:pk>/accept/', views.acceptApplication, name='acceptApplication'),
    path('applications/<int:pk>/refuse/', views.refuseApplication, name='refuseApplication'),
    path('job/<int:pk>/modifyJob/', views.modifyJob, name='modifyJob'),
]
