from rest_framework.views import APIView
from apps.publication.models import Publication
from apps.category.models import Category
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import PublicationSerializer
from core.pagination import CustomPagination
from django.db.models import Q


class CreatePublicationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, format=None):

        publication_serializer = PublicationSerializer(data=request.data)
        
        if publication_serializer.is_valid():
            publication_serializer.save(user=self.request.user)
            return Response(publication_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', publication_serializer.errors)
            return Response(publication_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePublicationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, publicationId, format=None):
        try:
            publication_id = int(publicationId)
        except ValueError:
            return Response({'error': 'invalid publication id'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not Publication.objects.filter(id=publication_id).exists():
            return Response({'error': 'publication does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        publication = Publication.objects.get(id=publication_id)
        if not request.user.is_staff:  # Verificar si el usuario no es staff
            if publication.user != request.user:
                return Response({'error': 'you are not authorized to update this publication'}, status=status.HTTP_401_UNAUTHORIZED)
        
        publication_serializer = PublicationSerializer(publication, data=request.data)
        
        if publication_serializer.is_valid():
            publication_serializer.save(user=request.user)
            return Response(publication_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', publication_serializer.errors)
            return Response(publication_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DeletePublicationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, publicationId, format=None):
        try:
            publication_id = int(publicationId)
        except ValueError:
            return Response({'error': 'invalid publication id'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            publication = Publication.objects.get(id=publication_id)
        except Publication.DoesNotExist:
            return Response({'error': 'publication does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        is_owner = publication.user == user
        is_staff = user.is_staff
        
        if not (is_owner or is_staff):
            return Response({'error': 'you are not authorized to delete this publication'}, status=status.HTTP_401_UNAUTHORIZED)
        
        publication.delete()
        return Response({'success': 'publication deleted'}, status=status.HTTP_200_OK)



class PublicationDetailView(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self,request,publicationId, format=None):
        try:
            publication_id=int(publicationId)
        except:
            return Response({'error':'invalid publication id'},status=status.HTTP_404_NOT_FOUND)
        
        if Publication.objects.filter(id=publication_id).exists():
            publication=Publication.objects.get(id=publication_id)
            publication=PublicationSerializer(publication)
            return Response({'publication': publication.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'publication does not exist'},status=status.HTTP_404_NOT_FOUND)

class PublicationListView(APIView):
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
            publications=Publication.objects.all().order_by(sortBy)[:limit]
        elif order=='asc':
            publications=Publication.objects.all().order_by(sortBy)[:limit]
        else:
            publications=Publication.objects.all().order_by(sortBy)
        
        publications=PublicationSerializer(publications,many=True)
        if Publication:
            return Response({'publications': publications.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'no publications found'},status=status.HTTP_404_NOT_FOUND)
        
class PublicationSearchView(APIView):
    permission_classes=(permissions.AllowAny,)
    
    def post(self,request,format=None):
        data=request.data
        
        try:
            category_id=int(data['category_id'])
        except:
            return Response({'error':'invalid category id'},status=status.HTTP_400_BAD_REQUEST)
        
        search=data['search']

        if len(search)==0:
            search_results=Publication.objects.order_by('-date_created').all()
        else:
            search_results=Publication.objects.filter(Q(name__icontains=search) | Q(description__icontains=search)).order_by('-date_created')

        if category_id==0:
            paginator = CustomPagination()
            paginated_publications = paginator.paginate_queryset(search_results, request)
            paginated_publications=PublicationSerializer(paginated_publications,many=True)
            return paginator.get_paginated_response(paginated_publications.data)
       

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
        
        paginator = CustomPagination()
        paginated_publications = paginator.paginate_queryset(search_results, request)
        paginated_publications=PublicationSerializer(paginated_publications,many=True)
        return paginator.get_paginated_response(paginated_publications.data)
    
class RelatedPublicationsListView(APIView):
    permissions_classes=(permissions.AllowAny,)
    def get(self,request,publicationId,format=None):
        try:
            publication_id=int(publicationId)
        except:
            return Response({'error':'invalid publication id'},status=status.HTTP_400_BAD_REQUEST)
        
        if not publication.objects.filter(id=publication_id).exists():
            return Response({'error':'publication does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        publication=Publication.objects.get(id=publication_id)
        category=publication.category
        if Publication.objects.filter(category=category).exists():

            if category.parent:
                related_publications=Publication.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_publications=Publication.objects.filter(category=category).exclude(id=publication_id)
                else:
                    categories=Category.objects.filter(parent=category)
                    filtered_categories=[category]
                    for category in categories:
                        filtered_categories.append(category)
                
                    filtered_categories=tuple(filtered_categories)
                    related_publications=Publication.objects.filter(category__in=filtered_categories).exclude(id=publication_id)
            
            related_publications=PublicationSerializer(related_publications,many=True)
            if len(related_publications.data)>3:
                return Response({'related_publications': related_publications.data[:3]},status=status.HTTP_200_OK)
            elif len(related_publications.data)>0:
                return Response({'related_publications': related_publications.data},status=status.HTTP_200_OK)
            else:
                return Response({'error':'no related publications found'},status=status.HTTP_200_OK)
        
        else:
            return Response({'error':'publication does not exist'},status=status.HTTP_200_OK)
            
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
            publication_results=Publication.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response({'error':'category does not exist'},status=status.HTTP_404_NOT_FOUND)
        
        else:
            category=Category.objects.get(id=category_id)
           
            if category.parent:
                publication_results=Publication.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    publication_results=Publication.objects.filter(category=category)
                else:
                    categories=Category.objects.filter(parent=category)
                    filtered_categories=[category]
                    for category in categories:
                        filtered_categories.append(category)
                    
                    filtered_categories=tuple(filtered_categories)
                    publication_results=Publication.objects.filter(category__in=filtered_categories)

        if order=='desc':
            sort_by='-'+sort_by
            publication_results=publication_results.order_by(sort_by)
        elif order=='asc':
            publication_results=publication_results.order_by(sort_by)
        else:
            publication_results=publication_results.order_by(sort_by)

        publication_results=PublicationSerializer(publication_results,many=True)

        if len(publication_results.data)>0:
            return Response({'filtered_publications': publication_results.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':'no publications found'},status=status.HTTP_200_OK)