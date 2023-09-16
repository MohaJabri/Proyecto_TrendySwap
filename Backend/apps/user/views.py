from rest_framework import viewsets
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    ChangePasswordSerializer,
    CustomTokenObtainPairSerializer,
    SearchUserSerializer,
    UserLoggedSerializer
)
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from django.db.models.query_utils import Q
from .pagination import CustomPagination
# Create your views here..
def staff_required(view_func):
    def wrapped_view(view_instance, request, *args, **kwargs):
        if request.user.is_staff:
            return view_func(view_instance, request, *args, **kwargs)
        else:
            return Response({'message':'Sin autorización'}, status=status.HTTP_401_UNAUTHORIZED)
    return wrapped_view

class UserViewSet(viewsets.ModelViewSet):
    serializer_class=UserSerializer
      
    def get_queryset(self):
        if self.queryset is None:
            self.queryset=self.get_serializer().Meta.model.objects.filter(is_active=True)
            return self.queryset
        else:
            return self.queryset

    def get_objet(self, pk):
        return get_object_or_404(self.serializer_class.Meta.model,pk=pk)
    
    def get_permissions(self):
        if self.action=='create':
            return [AllowAny()]
        else:
            return super().get_permissions()
        
    def list(self,request):
        users_serializer=self.serializer_class(self.get_queryset(),many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        user_serializer=UserCreateSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, pk=None):
        user=self.get_objet(pk=pk)
        user_serializer=self.serializer_class(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'message':'Usuario actualizado satisfactoriamente', 'data': user_serializer.data},status=status.HTTP_200_OK)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def retrieve(self, request, pk=None):
        user=self.serializer_class.Meta.model.objects.filter(is_active=True, pk=pk).first()
        if user:
            user_serializer=self.serializer_class(user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Usuario no encontrado'},status=status.HTTP_404_NOT_FOUND)
    @staff_required
    def destroy(self, request, pk=None):
        user= self.get_objet(pk=pk)
        user.is_active=False
        if user.is_active==False:
            user.save()
            return Response({'message':'Usuario eliminado satisfactoriamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Usuario no eliminado'},status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=True)
    def change_password(self, request, pk=None):
        user=self.get_objet(pk=pk)
        password_serializer=ChangePasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validate_data['password'])
            user.save()
            return Response({'message':'Contraseña cambiada satisfactoriamente'}, status=status.HTTP_200_OK)
        else:
            return Response(password_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Autenticación
class LoginView(TokenObtainPairView):
    serializer_class=CustomTokenObtainPairSerializer
    def post(self, request, *arg, **kwargs):
        username=request.data.get('username','')
        password=request.data.get('password','')
        user=authenticate(username=username, password=password)
    
        if user:
            login_serializer=self.get_serializer(data=request.data)
            if login_serializer.is_valid():
                user_serializer=UserSerializer(user)
                return Response({
                    'access':login_serializer.validated_data['access'],
                    'refresh':login_serializer.validated_data['refresh'],
                    'user': user_serializer.data,
                    'message':'Login satisfactorio',
                    },status=status.HTTP_200_OK)
            else:
                return Response(login_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        else:
                return Response({'message':'Nombre de usuario o contraseña incorrecta'},status=status.HTTP_400_BAD_REQUEST)
        

class SearchUserView(APIView):
    def get(self, request):
        search_term=request.query_params.get('search')
        matches=User.objects.filter(
            Q(username_icontains=search_term)|
            Q(first_name_icontains=search_term)|
            Q(last_name_icontains=search_term)
        ).distinct()

        paginator=CustomPagination()
        results=paginator.paginate_queryset(matches,request)

        user_search_serializer=SearchUserSerializer(results,many=True)
        return paginator.get_paginated_response(user_search_serializer.data)
    

class UserLoggedDataView(APIView):
    def get(self, request):
        user=request.user
        user_serializer=UserLoggedSerializer(user)
        return Response(user_serializer.data, status=status.HTTP_200_OK)
