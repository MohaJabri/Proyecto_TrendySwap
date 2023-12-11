from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.urls import re_path
from django.conf.urls.static import static

urlpatterns = [

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/category/', include('apps.category.urls')),
    path('api/publication/', include('apps.publication.urls')),
    path('api/profile/', include('apps.user_profile.urls')),
    path('api/notification/', include('apps.notification.urls')),
    path('admin/', admin.site.urls),
    
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)