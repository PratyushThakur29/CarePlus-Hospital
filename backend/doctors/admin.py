from django.contrib import admin

from .models import Doctor


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ("full_name", "department", "specialization", "years_of_experience")
    list_filter = ("department",)
    search_fields = ("first_name", "last_name", "specialization")
