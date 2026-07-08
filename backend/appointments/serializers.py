from datetime import date

from rest_framework import serializers

from doctors.models import Doctor
from doctors.serializers import DoctorSerializer

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        source="doctor", write_only=True, queryset=Doctor.objects.all()
    )
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = (
            "id",
            "patient",
            "patient_name",
            "doctor",
            "doctor_id",
            "appointment_date",
            "appointment_time",
            "reason",
            "status",
            "created_at",
        )
        read_only_fields = ("patient", "status", "created_at")

    def get_patient_name(self, obj):
        return f"{obj.patient.first_name} {obj.patient.last_name}".strip() or obj.patient.username

    def validate_appointment_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        return value

    def validate_reason(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Please provide a brief reason for your visit (min. 5 characters).")
        return value

    def create(self, validated_data):
        validated_data["patient"] = self.context["request"].user
        return super().create(validated_data)
