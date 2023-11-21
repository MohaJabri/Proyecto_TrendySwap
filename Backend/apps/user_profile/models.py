from django.db import models
from django.conf import settings
User=settings.AUTH_USER_MODEL
# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=255, default='')


    def __str__(self):
        return self.user