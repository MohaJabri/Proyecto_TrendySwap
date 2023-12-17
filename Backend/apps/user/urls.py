from django.urls import path
from .views import UserSearchView, UserDeleteView
urlpatterns = [
    path('search/', UserSearchView.as_view(), name='search'),
    path('delete/<int:user_id>/', UserDeleteView.as_view(), name='delete'),
]

