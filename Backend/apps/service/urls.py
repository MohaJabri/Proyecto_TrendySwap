from django.urls import path
from .views import CreateServiceView, ServiceDetailView



urlpatterns = [
    path('get-service/<serviceId>/', ServiceDetailView.as_view(), name='service'),
    path('create/', CreateServiceView.as_view(), name='create'),
    
]