from django.contrib import admin
from .models import Publication

# Register your models here.
class PublicationAdmin(admin.ModelAdmin):
    list_display=('id', 'name', 'category', 'user', 'date_created')
    list_display_links=('id', 'name')
    search_fields=('name', 'description', 'category')
    list_per_page=25

admin.site.register(Publication, PublicationAdmin)