from rest_framework import permissions, viewsets

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    Authenticated endpoint for booking and viewing appointments.
    Patients can only see and create their own appointments.
    """

    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ["get", "post", "head", "options"]

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user).select_related("doctor", "doctor__department")

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)
