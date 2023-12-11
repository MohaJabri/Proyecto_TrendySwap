import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = 'notification_%s' % self.room_name
   
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
        print("Connected")

    async def disconnect(self, close_code):
  
        print("Disconnected")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(message)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'notification_message',
                'message': message
            }
        )

    async def send_notification(self, event):
        notification_data = event['message']
        await self.send(text_data=json.dumps({
            'notification': notification_data
        }))
        print("Notification sent")