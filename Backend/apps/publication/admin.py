from django.contrib import admin
from django import forms
from .models import Publication, PublicationImage
from django.contrib.auth.models import User

class PublicationAdmin(admin.ModelAdmin):
    list_display=('id', 'service_requested', 'category', 'user', 'date_created')
    list_display_links=('id', 'service_requested')
    search_fields=('service_requested', 'description', 'category')
    list_per_page=25

admin.site.register(Publication, PublicationAdmin)

class PublicationImageForm(forms.ModelForm):
    class Meta:
        model = PublicationImage
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['publication'].widget = forms.Select(choices=self.get_publication_choices())

    def get_publication_choices(self):
        return [(publication.id, f"Publication ID: {publication.id}") for publication in Publication.objects.all()]

class PublicationImageAdmin(admin.ModelAdmin):
    form = PublicationImageForm
    list_display=('id', 'get_user_email', 'publication', 'publication_id', 'image')
    list_display_links=('id', 'publication')
    search_fields=('publication__id', 'image')
    list_per_page=25

    def get_user_email(self, obj):
        return obj.publication.user.email

    get_user_email.short_description = 'User Email'

admin.site.register(PublicationImage, PublicationImageAdmin)
