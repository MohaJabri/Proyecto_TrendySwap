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
    

    def put(self, request, user_id, format=None):
        try:
            data = self.request.data

            first_name = data.get('first_name')
            last_name = data.get('last_name')
            phone = data['phone']
            address = data['address']
            city = data['city']
            country = data['country']
            state = data['state']
            postal_code = data['postal_code']

            # Retrieve the UserProfile instance based on provided user_id
            user_profile = UserProfile.objects.get(user__id=user_id)

            # Check permissions - Allow staff or the user to update the profile
            if not request.user.is_staff and user_profile.user != request.user:
                return Response({'error': 'You are not authorized to update this profile'},
                                status=status.HTTP_401_UNAUTHORIZED)

            # Update UserProfile fields
            user_profile.phone = phone
            user_profile.address = address
            user_profile.city = city
            user_profile.country = country
            user_profile.state = state
            user_profile.postal_code = postal_code
            user_profile.save()

            # Update User fields if provided
            user = user_profile.user
            if first_name:
                user.first_name = first_name
            if last_name:
                user.last_name = last_name
            user.save()

            # Serialize UserProfile instance
            serialized_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': serialized_profile.data},
                status=status.HTTP_200_OK
            )
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'User profile does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': f'Something went wrong: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
