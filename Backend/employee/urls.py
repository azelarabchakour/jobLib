from django.contrib import admin
from django.urls import path
from employee import views
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register('employees', views.EmployeeViewSet)
router.urls

urlpatterns = router.urls
