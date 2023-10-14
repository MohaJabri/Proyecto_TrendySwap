from django.contrib.auth import get_user_model
User=get_user_model()
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model=User
        fields=('id','email', 'first_name', 'last_name', 'get_full_name' , 'get_short_name', 'is_professional')
