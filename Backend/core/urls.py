from django.contrib import admin
from django.urls import path, include

from django.urls import re_path


urlpatterns = [

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    
    
    path('admin/', admin.site.urls),
    
]
