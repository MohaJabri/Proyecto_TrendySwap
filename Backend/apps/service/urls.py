from django.urls import path
from .views import CreateServiceView, ServiceDetailView, ServiceListView, ServiceSearchView, RelatedServicesListView, ListBySearchView



urlpatterns = [
    path('get-service/<serviceId>/', ServiceDetailView.as_view(), name='service'),
    path('create/', CreateServiceView.as_view(), name='create'),
    path('get-services/', ServiceListView.as_view(), name='services'),
    path('search/', ServiceSearchView.as_view(), name='search'),
    path('related/<serviceId>/', RelatedServicesListView.as_view(), name='related'),
    path('by/search/', ListBySearchView.as_view(), name='by-search'),
]