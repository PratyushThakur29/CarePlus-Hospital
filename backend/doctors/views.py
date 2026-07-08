from django.db.models import Q
from rest_framework import permissions, viewsets

from .models import Doctor
from .serializers import DoctorSerializer


class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public, read-only list/detail of hospital doctors.

    Supports searching via ?search= across name, specialization, and department name,
    and filtering via ?department=<slug>.
    """

    queryset = Doctor.objects.select_related("department").all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get("search")
        department_slug = self.request.query_params.get("department")

        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(specialization__icontains=search)
                | Q(department__name__icontains=search)
            )

        if department_slug:
            queryset = queryset.filter(department__slug=department_slug)

        return queryset
