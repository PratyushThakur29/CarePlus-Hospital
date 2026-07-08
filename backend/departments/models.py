from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True)
    icon = models.CharField(
        max_length=50,
        default="stethoscope",
        help_text="Icon keyword used by the frontend (e.g. heart, bone, brain).",
    )
    short_description = models.CharField(max_length=200)
    description = models.TextField()
    services = models.TextField(
        help_text="One service per line.",
        blank=True,
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    def services_list(self):
        return [s.strip() for s in self.services.splitlines() if s.strip()]
