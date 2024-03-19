from django.db import models
from django.conf import settings
User=settings.AUTH_USER_MODEL
# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=255, default='')
    address = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    country = models.CharField(max_length=255, default='')
    state = models.CharField(max_length=255, default='')
    postal_code = models.CharField(max_length=255, default='')
    about = models.TextField(default='')
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)

    def __str__(self):
        return self.user