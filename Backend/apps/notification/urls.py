from django.urls import path
from .views import sendNotification, CreateNotificationView, ListNotificationsView, sendEmail, rejectRequest, CheckNotificationSent

urlpatterns = [
    path('sendNotification/', sendNotification.as_view()),
    path('get-notifications/', ListNotificationsView.as_view()),
    path('create/', CreateNotificationView.as_view()),
    path('send-email/', sendEmail.as_view()),
    path('reject-request/', rejectRequest.as_view()),
    path('check-sent/', CheckNotificationSent.as_view())

]