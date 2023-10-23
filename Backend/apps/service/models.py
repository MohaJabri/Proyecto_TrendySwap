from django.db import models
from datetime import datetime
from apps.category.models import Category
from django.conf import settings
User=settings.AUTH_USER_MODEL
# Create your models here.

class Service(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField()
    category=models.ForeignKey(Category, on_delete=models.CASCADE)
    photo=models.ImageField(upload_to='photos/%Y/%m/')
    date_created=models.DateTimeField(default=datetime.now, blank=True)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
    def get_thumbnail(self):
        if self.photo:
            return self.photo.url
        else:
            return 'https://via.placeholder.com/300x300.png?text=No+Image'
        