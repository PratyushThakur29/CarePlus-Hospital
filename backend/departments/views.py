from rest_framework import permissions, viewsets

from .models import Department
from .serializers import DepartmentSerializer


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    """Public, read-only list/detail of hospital departments."""

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
