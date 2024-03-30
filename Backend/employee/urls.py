from django.contrib import admin
from django.urls import path, include
from employee import views
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register('employees', views.EmployeeViewSet)
router.register('matchedJobs', views.MatchedJobsViewSet,basename='matchedjobs')#get all matched jobs for the logged in employee
#router.register('uploadCv', views.FileUploadView,basename='uploadcv')
#router.register(r'upload', views.UploadViewSet, basename="upload")

urlpatterns = [
    path('', include(router.urls)),
    path('jobs/<int:pk>/', views.matchedJobDetails, name='matchedjobdetails'),  
    path('jobs/<int:pk>/apply/',views.apply, name='apply'),
    path('jobs/status/',views.applicationStatus, name='applicationStatus'),
    #path('uploadCv',views.uploadCv, name='uploadCv'),
    #path('uploadCv/', views.FileUploadView.as_view(), name='uploadcv'),
]
#urlpatterns = router.urls
