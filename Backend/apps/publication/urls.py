from django.urls import path
from .views import CreatePublicationView, PublicationDetailView, PublicationListView, PublicationSearchView, RelatedPublicationsListView, ListBySearchView, UpdatePublicationView, DeletePublicationView



urlpatterns = [
    path('get-publication/<publicationId>/', PublicationDetailView.as_view(), name='publication'),
    path('create/', CreatePublicationView.as_view(), name='create'),
    path('update/<publicationId>/', UpdatePublicationView.as_view(), name='update'),
    path('delete/<publicationId>/', DeletePublicationView.as_view(), name='delete'),
    path('get-publications/', PublicationListView.as_view(), name='publications'),
    path('search/', PublicationSearchView.as_view(), name='search'),
    path('related/<publicationId>/', RelatedPublicationsListView.as_view(), name='related'),
    path('by/search/', ListBySearchView.as_view(), name='by-search'),
]