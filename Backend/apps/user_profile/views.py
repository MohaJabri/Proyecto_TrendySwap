from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class GetUserProfileView(APIView):
    def get(self, request, userId, format=None):
        try:
            user_profile = UserProfile.objects.get(user=userId)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when getting profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            first_name = data.get('first_name')
            last_name = data.get('last_name')
            phone = data['phone']
            address = data['address']
            city = data['city']
            country = data['country']
            state = data['state']
            postal_code = data['postal_code']

            
            UserProfile.objects.filter(user=user).update(
                
                phone=phone,
                address=address,
                city=city,
                country=country,
                state=state,
                postal_code=postal_code,
                
            )

            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            user.save()

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )