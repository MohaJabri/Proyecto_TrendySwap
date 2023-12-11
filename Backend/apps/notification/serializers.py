from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    user_from_full_name = serializers.SerializerMethodField()
    object_offered=serializers.SerializerMethodField()
    service_requested=serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = '__all__' 
        read_only_fields = ['user_from', 'is_read']

    def get_user_from_full_name(self, obj):
        if obj.user_from:
            return obj.user_from.get_full_name()
        return ''
    
    def get_object_offered(self, obj):
        publication = obj.related_publication
        if publication:
            return publication.object_offered

    def get_service_requested(self, obj):
        publication = obj.related_publication
        if publication:
            return publication.service_requested
