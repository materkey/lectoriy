from django.contrib import admin

from chats.models import Chat, Message

class MessageInline(admin.TabularInline):
    model = Message

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    inlines = [
        MessageInline,
    ]

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at',)