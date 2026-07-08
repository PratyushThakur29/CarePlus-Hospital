from django.db import models

from departments.models import Department


class Doctor(models.Model):
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="doctors")
    specialization = models.CharField(max_length=150)
    qualifications = models.CharField(max_length=200, help_text="e.g. MBBS, MD (Cardiology)")
    years_of_experience = models.PositiveIntegerField(default=0)
    bio = models.TextField()
    photo_url = models.URLField(blank=True, help_text="Optional profile photo URL.")
    email = models.EmailField(blank=True)
    available_days = models.CharField(
        max_length=100,
        default="Monday - Friday",
        help_text="e.g. 'Mon, Wed, Fri' or 'Monday - Friday'",
    )
    consultation_fee = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    class Meta:
        ordering = ["last_name", "first_name"]

    def __str__(self):
        return f"Dr. {self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"Dr. {self.first_name} {self.last_name}"
