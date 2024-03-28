from django.contrib import admin
from django.urls import path, include
from employee import views
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register('employees', views.EmployeeViewSet)
router.register('matchedJobs', views.MatchedJobsViewSet,basename='matchedjobs')#get all matched jobs for the logged in employee


urlpatterns = [
    path('', include(router.urls)),
    path('jobs/<int:pk>/', views.matchedJobDetails, name='matchedjobdetails'),  
    path('jobs/<int:pk>/apply/',views.apply, name='apply'),
]
#urlpatterns = router.urls
