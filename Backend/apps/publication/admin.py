from django.contrib import admin
from .models import Publication

# Register your models here.
class PublicationAdmin(admin.ModelAdmin):
    list_display=('id', 'service_requested', 'category', 'user', 'date_created')
    list_display_links=('id', 'service_requested')
    search_fields=('service_requested', 'description', 'category')
    list_per_page=25

admin.site.register(Publication, PublicationAdmin)