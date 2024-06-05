from django.contrib.auth import get_user_model
User=get_user_model()
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from apps.user_profile.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_image']

class UserCreateSerializer(UserCreateSerializer):
    profile = UserProfileSerializer(source='userprofile', read_only=True)
    class Meta(UserCreateSerializer.Meta):
        model=User
        fields=('id','email', 'first_name', 'last_name', 'get_full_name' , 'get_short_name', 'is_staff', 'profile')
