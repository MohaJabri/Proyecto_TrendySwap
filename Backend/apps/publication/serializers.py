from rest_framework import serializers
from .models import Publication

class PublicationSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = '__all__' 
        read_only_fields = ['user']
       

    def get_user_full_name(self, obj):
        if obj.user:
            return obj.user.get_full_name()
        return ''