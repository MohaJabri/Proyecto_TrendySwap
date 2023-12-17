from django.urls import path
from .views import sendNotification, CreateNotificationView, ListNotificationsView, sendEmail

urlpatterns = [
    path('sendNotification/', sendNotification.as_view()),
    path('get-notifications/', ListNotificationsView.as_view()),
    path('create/', CreateNotificationView.as_view()),
    path('send-email/', sendEmail.as_view()),
]