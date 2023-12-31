from django.contrib import admin
from .models import Category

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display=('id','name','parent')
    list_filter=('id','name','parent')
    search_fields=('id','name','parent')
    list_per_page=25

admin.site.register(Category,CategoryAdmin)
