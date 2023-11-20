

from rest_framework.views import APIView
from apps.service.models import Service
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
    permission_classes=(permissions.AllowAny,)
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
            sortBy='-'+ sortBy
            services=Service.objects.all().order_by(sortBy)[:limit]
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
    permission_classes=(permissions.AllowAny,)
    
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
            return Response({'search_services': search_results.data},status=status.HTTP_200_OK)

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
        

        search_results=ServiceSerializer(search_results,many=True)
        return Response({'search_services': search_results.data},status=status.HTTP_200_OK)
    
class RelatedServicesListView(APIView):
    permissions_classes=(permissions.AllowAny,)
    def get(self,request,serviceId,format=None):
        try:
            service_id=int(serviceId)
        except:
            return Response({'error':'invalid service id'},status=status.HTTP_400_BAD_REQUEST)
        
        if not Service.objects.filter(id=service_id).exists():
            return Response({'error':'service does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        service=Service.objects.get(id=service_id)
        category=service.category
        if Service.objects.filter(category=category).exists():

            if category.parent:
                related_services=Service.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_services=Service.objects.filter(category=category).exclude(id=service_id)
                else:
                    categories=Category.objects.filter(parent=category)
                    filtered_categories=[category]
                    for category in categories:
                        filtered_categories.append(category)
                
                    filtered_categories=tuple(filtered_categories)
                    related_services=Service.objects.filter(category__in=filtered_categories).exclude(id=service_id)
            
            related_services=ServiceSerializer(related_services,many=True)
            if len(related_services.data)>3:
                return Response({'related_services': related_services.data[:3]},status=status.HTTP_200_OK)
            elif len(related_services.data)>0:
                return Response({'related_services': related_services.data},status=status.HTTP_200_OK)
            else:
                return Response({'error':'no related services found'},status=status.HTTP_200_OK)
        
        else:
            return Response({'error':'service does not exist'},status=status.HTTP_200_OK)
            
class ListBySearchView(APIView):
    permission_classes=(permissions.AllowAny,)
    def post(self, request, format=None):
        data=self.request.data
        print(data)
        try:
            category_id=int(data['category_id'])
        except:
            return Response({'error':'invalid category id'},status=status.HTTP_400_BAD_REQUEST)
        sort_by=data['sort_by']
        
        if not (sort_by=='date_created' or sort_by=='name'):
            sort_by='date_created'

        order=data['order']

        if category_id==0:
            service_results=Service.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response({'error':'category does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        else:
            category=Category.objects.get(id=category_id)
           
            if category.parent:
                service_results=Service.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    service_results=Service.objects.filter(category=category)
                else:
                    categories=Category.objects.filter(parent=category)
                    filtered_categories=[category]
                    for category in categories:
                        filtered_categories.append(category)
                    
                    filtered_categories=tuple(filtered_categories)
                    service_results=Service.objects.filter(category__in=filtered_categories)

        if order=='desc':
            sort_by='-'+sort_by
            service_results=service_results.order_by(sort_by)
        elif order=='asc':
            service_results=service_results.order_by(sort_by)
        else:
            service_results=service_results.order_by(sort_by)

        service_results=ServiceSerializer(service_results,many=True)

        if len(service_results.data)>0:
            return Response({'filtered_services': service_results.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'no services found'},status=status.HTTP_200_OK)