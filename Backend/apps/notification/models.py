from django.db import models
from django.conf import settings
from apps.publication.models import Publication
from datetime import datetime

User = settings.AUTH_USER_MODEL

class Notification(models.Model):
    notification_type = models.CharField(max_length=100)  # Tipo de notificación (opcional)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    is_read = models.BooleanField(default=False)
    user_from = models.ForeignKey(User, related_name='sent_notifications', on_delete=models.CASCADE)
    user_to = models.ForeignKey(User, related_name='received_notifications', on_delete=models.CASCADE)
    related_publication = models.ForeignKey(Publication, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.notification_type} - {self.user_from} to {self.user_to}"
