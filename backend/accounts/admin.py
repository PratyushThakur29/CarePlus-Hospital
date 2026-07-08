from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("username", "email", "first_name", "last_name", "phone_number", "is_staff")
    fieldsets = UserAdmin.fieldsets + (
        ("Patient Information", {"fields": ("phone_number", "date_of_birth")}),
    )
