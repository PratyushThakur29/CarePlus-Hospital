from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),
    path("api/doctors/", include("doctors.urls")),
    path("api/departments/", include("departments.urls")),
    path("api/appointments/", include("appointments.urls")),
    path("api/contact/", include("contact.urls")),
]
