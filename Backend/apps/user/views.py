from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from apps.user.serializers import UserCreateSerializer
from core.pagination import CustomPagination
from rest_framework.permissions import IsAdminUser
User = get_user_model()

class UserSearchView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)

    def post(self, request, format=None):
        data = request.data
        
        try:
            search_term = data.get('search', '')
        except KeyError:
            return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        search_results = User.objects.all()
        search_results = search_results.exclude(is_staff=True)

        if search_term:
            search_results = search_results.filter(
                Q(email__icontains=search_term) |
                Q(first_name__icontains=search_term) |
                Q(last_name__icontains=search_term)
            )
        paginator = CustomPagination()

        paginated_users = paginator.paginate_queryset(search_results, request)
        paginated_users = UserCreateSerializer(paginated_users, many=True)
        return paginator.get_paginated_response(paginated_users.data)
    
class UserDeleteView(generics.DestroyAPIView):
    permission_classes = (IsAdminUser,)
    
    def delete(self, request, user_id, format=None):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        user.delete()
        return Response({'success': 'User deleted successfully'}, status=status.HTTP_200_OK)
    