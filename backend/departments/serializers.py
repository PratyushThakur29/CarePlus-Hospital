from rest_framework import serializers

from .models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    services = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = (
            "id",
            "name",
            "slug",
            "icon",
            "short_description",
            "description",
            "services",
        )

    def get_services(self, obj):
        return obj.services_list()
