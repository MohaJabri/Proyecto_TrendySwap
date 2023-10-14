from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Category
# Create your views here.

class ListCategoriesView(APIView):
    permission_classes=(permissions.AllowAny,)
    def get(self, request, format=None):
        if Category.objects.all().exists():
            categories=Category.objects.all()
            
            result=[]
            for category in categories:
                if not category.parent:
                    item={}
                    item['id']=category.id
                    item['name']=category.name
                    item['subcategories']=[]
                    for subcategory in categories:
                        subitem={}
                        if subcategory.parent and subcategory.parent.id==category.id:
                            subitem['id']=subcategory.id
                            subitem['name']=subcategory.name
                            item['subcategories']=[]
                            item['subcategories'].append(subitem)
                    result.append(item)

            return Response({'categories':result}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'No categories found'}, status=status.HTTP_404_NOT_FOUND)