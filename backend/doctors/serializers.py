from rest_framework import serializers

from departments.models import Department
from departments.serializers import DepartmentSerializer

from .models import Doctor


class DoctorSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.PrimaryKeyRelatedField(
        source="department", write_only=True, queryset=Department.objects.all()
    )
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Doctor
        fields = (
            "id",
            "first_name",
            "last_name",
            "full_name",
            "department",
            "department_id",
            "specialization",
            "qualifications",
            "years_of_experience",
            "bio",
            "photo_url",
            "email",
            "available_days",
            "consultation_fee",
        )
