from django.contrib import admin
from django.urls import path, include
from employee import views
from .views import   update_employee, EmployeeViewSet
from rest_framework.routers import SimpleRouter, DefaultRouter


router = DefaultRouter()
router.register(r'employee', EmployeeViewSet, basename='employee')
#router.register('employees', views.EmployeeUpdateView, basename= 'employees')
router.register('matchedJobs', views.MatchedJobsViewSet,basename='matchedjobs')#get all matched jobs for the logged in employee
#router.register('uploadCv', views.FileUploadView,basename='uploadcv')
#router.register(r'upload', views.UploadViewSet, basename="upload")

urlpatterns = [
    path('', include(router.urls)),
    path('home', views.home, name='home'),
    path('employee/<int:pk>/', update_employee, name='update_employee'),
    #path('employee/', views.getEmployee, name='getEmployee'),
    #path('employee/update/', views.updateEmployee, name='updateEmployee'),
    path('jobs/<int:pk>/', views.matchedJobDetails, name='matchedjobdetails'),  
    path('jobs/<int:pk>/apply/',views.apply, name='apply'),
    path('jobs/status/',views.applicationStatus, name='applicationStatus'),

    #path('uploadCv',views.uploadCv, name='uploadCv'),
    #path('uploadCv/', views.FileUploadView.as_view(), name='uploadcv'),
]
#urlpatterns = router.urls
