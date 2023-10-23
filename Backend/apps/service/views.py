

from rest_framework.views import APIView
from .models import Service
from apps.category.models import Category
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import ServiceSerializer
from django.db.models import Q

class CreateServiceView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    

    def post(self, request, format=None):

        service_serializer = ServiceSerializer(data=request.data)
        
        if service_serializer.is_valid():
            service_serializer.save(user=self.request.user)
            return Response(service_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', service_serializer.errors)
            return Response(service_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ServiceDetailView(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self,request,serviceId, format=None):
        try:
            service_id=int(serviceId)
        except:
            return Response({'error':'invalid service id'},status=status.HTTP_404_NOT_FOUND)
        
        if Service.objects.filter(id=service_id).exists():
            service=Service.objects.get(id=service_id)
            service=ServiceSerializer(service)
            return Response({'service': service.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'service does not exist'},status=status.HTTP_404_NOT_FOUND)
        
class ServiceListView(APIView):
    permissions_classes=(permissions.AllowAny,)
    def get(self,request,format=None):
        sortBy=request.query_params.get('sortBy')
        if not (sortBy=='date_created' or sortBy=='name'):
            sortBy='date_created'
        
        order=request.query_params.get('order')
        limit=request.query_params.get('limit')

        if not limit:
            limit=6
        else:
            try:
                limit=int(limit)
            except:
                return Response({'error':'invalid limit'},status=status.HTTP_400_BAD_REQUEST)

        if limit<=0:
            limit=6
    
        if order=='desc':
            order='-'+sortBy
            services=Service.objects.all().order_by(order)[:limit]
        elif order=='asc':
            services=Service.objects.all().order_by(sortBy)[:limit]
        else:
            services=Service.objects.all().order_by(sortBy)
        
        services=ServiceSerializer(services,many=True)
        if Service:
            return Response({'services': services.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'no services found'},status=status.HTTP_404_NOT_FOUND)
        
class ServiceSearchView(APIView):
    permissions_classes=(permissions.AllowAny,)
    
    def post(self,request,format=None):
        data=request.data
        
        try:
            category_id=int(data['category_id'])
        except:
            return Response({'error':'invalid category id'},status=status.HTTP_400_BAD_REQUEST)
        
        search=data['search']

        if len(search)==0:
            search_results=Service.objects.order_by('-date_created').all()
        else:
            search_results=Service.objects.filter(Q(name__icontains=search) | Q(description__icontains=search))

        if category_id==0:
            search_results=ServiceSerializer(search_results,many=True)
            return Response({'services': search_results.data},status=status.HTTP_200_OK)

        if not Category.objects.filter(id=category_id).exists():
            return Response({'error':'category does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        category=Category.objects.get(id=category_id)

        if category.parent:
            search_results=search_results.order_by('-date_created').filter(category=category)
        else:
            if not Category.objects.filter(parent=category).exists():
                search_results=search_results.order_by('-date_created').filter(category=category)
            else:
                categories=Category.objects.filter(parent=category)
                filtered_categories=[category]
                for category in categories:
                    filtered_categories.append(category)

                filtered_categories=tuple(filtered_categories)
                search_results=search_results.order_by('-date_created').filter(category__in=filtered_categories)

                