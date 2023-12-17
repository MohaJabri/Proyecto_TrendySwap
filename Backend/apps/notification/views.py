from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from asgiref.sync import async_to_sync
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound
from channels.layers import get_channel_layer
from apps.publication.models import Publication
from apps.notification.models import Notification
from django.core.mail import send_mail
from django.db import transaction
from apps.notification.serializers import NotificationSerializer  # Importa tu serializador

class CreateNotificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        # Obtener datos necesarios para crear la notificación
        publication_id = request.data.get('publication_id')
        
        
        # Verificar si los datos necesarios están presentes
        if not publication_id:
            return Response({"message": "No se proporcionó el ID de la publicación"}, status=status.HTTP_400_BAD_REQUEST)

           
        # Verificar si la publicación existe
        try:
            publication = Publication.objects.get(id=publication_id)
        except Publication.DoesNotExist:
            return Response({"message": "La publicación especificada no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        # Crear el diccionario de datos para el serializador
        notification_data = {
            "notification_type": "Solicitud de publicación",
            "user_to": publication.user.id,
            "related_publication": publication.id
        }

        # Crear el serializador con los datos
        notification_serializer = NotificationSerializer(data=notification_data)

        # Verificar la validez del serializador y guardar la notificación
        if notification_serializer.is_valid():
            notification_serializer.save(user_from=request.user)
            return Response(notification_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(notification_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ListNotificationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        # Obtener las notificaciones del usuario
        notifications = Notification.objects.filter(user_to=request.user.id, is_read=False)

        # Crear el serializador con los datos
        notification_serializer = NotificationSerializer(notifications, many=True)

        # Devolver las notificaciones
        return Response({'notifications':notification_serializer.data}, status=status.HTTP_200_OK)

class sendNotification(APIView):
    def post(self, request):
        user_requesting_id = request.data.get('user_requesting_id')
        owner_publication_id = request.data.get('owner_publication_id')

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'notification_%s' % owner_publication_id,
            {
                'type': 'send_notification',
                'message': user_requesting_id
            }
        )

        return Response(status=status.HTTP_200_OK)

class sendEmail(APIView):
    def post(self, request):
        user_requesting_email = request.data.get('user_requesting_email')
        publication_id = request.data.get('publication_id')  # ID de la publicación

        if not user_requesting_email:
            return Response({'message': 'Falta el correo del usuario'}, status=status.HTTP_400_BAD_REQUEST)
        if not publication_id:
            return Response({'message': 'Falta el ID de la publicación'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Obtener la información de la publicación
        publication = get_object_or_404(Publication, id=publication_id)

        # Componer el mensaje de correo electrónico
        email_message = f"Su solicitud de {publication.service_requested} a cambio de {publication.object_offered} ha sido aceptada, a continuación se le facilita la información de contacto: {publication.user.email}"

        email_from = settings.EMAIL_HOST_USER

        with transaction.atomic():  # Realizar la actualización atómicamente
            # Enviar el correo electrónico
            mail_sent = send_mail(
                'TrendySwap - Solicitud de publicación',
                email_message,
                email_from,
                [user_requesting_email],
                fail_silently=False,
            )

            if mail_sent == 1:
                # Actualizar el estado is_read a True
                notification = get_object_or_404(Notification, related_publication=publication.id)
                notification.is_read = True
                notification.save()

                return Response({'message': 'Correo enviado y notificación actualizada'}, status=status.HTTP_200_OK)
        
        return Response({'message': 'Fallo al enviar el correo o actualizar la notificación'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class rejectRequest(APIView):
    def post(self, request):
        notification_id = request.data.get('notification_id')

        if not notification_id:
            return Response({'message': 'Falta el ID de la notificación'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            notification = Notification.objects.get(id=notification_id)
            notification.is_read = True  # O cualquier actualización que desees hacer
            notification.save()

            return Response({'message': 'Estado de la notificación actualizado'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'message': 'No se encontró la notificación'}, status=status.HTTP_404_NOT_FOUND)

class CheckNotificationSent(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        publication_id = request.data.get('publication_id')

        if not publication_id:
            return Response({'message': 'Falta el ID de la publicación'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario ya ha enviado una notificación para esta publicación
        existing_notification = Notification.objects.filter(
            user_from=request.user,
            related_publication_id=publication_id
        ).exists()

        return Response({'notification_sent': existing_notification}, status=status.HTTP_200_OK)
