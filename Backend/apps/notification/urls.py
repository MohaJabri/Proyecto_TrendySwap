from django.urls import path
from .views import sendNotification, CreateNotificationView, ListNotificationsView, sendEmail, rejectRequest    

urlpatterns = [
    path('sendNotification/', sendNotification.as_view()),
    path('get-notifications/', ListNotificationsView.as_view()),
    path('create/', CreateNotificationView.as_view()),
    path('send-email/', sendEmail.as_view()),
    path('reject-request/', rejectRequest.as_view())

]