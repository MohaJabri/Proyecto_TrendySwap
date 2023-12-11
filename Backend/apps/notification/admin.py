from django.contrib import admin
from .models import Notification
# Register your models here.

class NotificationAdmin(admin.ModelAdmin):
    list_display=('id', 'notification_type', 'user_from', 'user_to', 'is_read', 'created_at')
    list_display_links=('id', 'notification_type')
    search_fields=('notification_type', 'user_from', 'user_to')
    list_per_page=25

admin.site.register(Notification, NotificationAdmin)