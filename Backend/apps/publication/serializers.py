from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()
    class Meta:
        model = Publication
        fields = '__all__' 
        read_only_fields = ['user']
        
       

    def get_user_full_name(self, obj):
        if obj.user:
            return obj.user.get_full_name()
        return ''
    
    def get_category_name(self, obj):
        if obj.category:
            return obj.category.name
        return ''

    def get_photo(self, obj):
        return obj.get_thumbnail()
        