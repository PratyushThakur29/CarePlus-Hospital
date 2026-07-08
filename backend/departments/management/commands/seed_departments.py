from django.core.management.base import BaseCommand
from django.utils.text import slugify

from departments.models import Department

DEPARTMENTS = [
    {
        "name": "Cardiology",
        "icon": "heart",
        "short_description": "Comprehensive heart care from diagnosis to recovery.",
        "description": (
            "Our Cardiology department provides complete care for heart conditions, "
            "from routine screenings to complex interventional procedures. Our team "
            "works closely with patients to manage risk factors and support long-term "
            "heart health."
        ),
        "services": "Echocardiography\nStress Testing\nCardiac Catheterization\nPacemaker Implantation\nHeart Failure Management",
    },
    {
        "name": "Orthopedics",
        "icon": "bone",
        "short_description": "Expert care for bones, joints, and muscles.",
        "description": (
            "The Orthopedics department treats conditions affecting the musculoskeletal "
            "system, including fractures, joint disorders, and sports injuries. We offer "
            "both surgical and non-surgical treatment options tailored to each patient."
        ),
        "services": "Joint Replacement Surgery\nSports Medicine\nFracture Care\nSpine Treatment\nPhysical Rehabilitation",
    },
    {
        "name": "Neurology",
        "icon": "brain",
        "short_description": "Specialized diagnosis and treatment of nervous system disorders.",
        "description": (
            "Our Neurology team diagnoses and manages conditions of the brain, spinal cord, "
            "and nerves, including stroke, epilepsy, and movement disorders, using advanced "
            "diagnostic imaging and individualized treatment plans."
        ),
        "services": "EEG & EMG Testing\nStroke Care\nEpilepsy Management\nMigraine Treatment\nMovement Disorder Clinic",
    },
    {
        "name": "Pediatrics",
        "icon": "baby",
        "short_description": "Compassionate healthcare for infants, children, and teens.",
        "description": (
            "The Pediatrics department offers preventive and acute care for children from "
            "birth through adolescence, including vaccinations, growth monitoring, and "
            "treatment of childhood illnesses in a child-friendly environment."
        ),
        "services": "Well-Child Visits\nImmunizations\nDevelopmental Screening\nNewborn Care\nAdolescent Medicine",
    },
    {
        "name": "Dermatology",
        "icon": "sparkles",
        "short_description": "Skin, hair, and nail care from experienced dermatologists.",
        "description": (
            "Our Dermatology specialists diagnose and treat a wide range of skin conditions, "
            "from acne and eczema to skin cancer screening, using modern clinical and "
            "cosmetic techniques."
        ),
        "services": "Skin Cancer Screening\nAcne & Eczema Treatment\nMole Removal\nPsoriasis Care\nCosmetic Dermatology",
    },
    {
        "name": "Gynecology",
        "icon": "flower",
        "short_description": "Comprehensive women's health services at every life stage.",
        "description": (
            "The Gynecology department provides preventive, reproductive, and prenatal care "
            "for women, supported by experienced physicians and a private, comfortable "
            "clinical setting."
        ),
        "services": "Prenatal Care\nWell-Woman Exams\nFamily Planning\nMenopause Management\nMinimally Invasive Surgery",
    },
    {
        "name": "General Surgery",
        "icon": "scalpel",
        "short_description": "Safe, modern surgical care across a wide range of procedures.",
        "description": (
            "Our General Surgery team performs a broad range of procedures using "
            "minimally invasive techniques where possible, supported by a dedicated "
            "pre- and post-operative care team."
        ),
        "services": "Laparoscopic Surgery\nAppendectomy\nHernia Repair\nGallbladder Surgery\nPost-Operative Care",
    },
    {
        "name": "Emergency Medicine",
        "icon": "activity",
        "short_description": "Round-the-clock emergency care when every minute counts.",
        "description": (
            "Our Emergency Department is staffed 24/7 with experienced emergency physicians "
            "and nurses equipped to handle everything from minor injuries to life-threatening "
            "conditions."
        ),
        "services": "Trauma Care\nUrgent Diagnostics\nCritical Care Stabilization\nPoison Control\nAmbulance Coordination",
    },
]


class Command(BaseCommand):
    help = "Seeds the database with realistic hospital departments."

    def handle(self, *args, **options):
        created_count = 0
        for dept in DEPARTMENTS:
            _, created = Department.objects.update_or_create(
                name=dept["name"],
                defaults={
                    "slug": slugify(dept["name"]),
                    "icon": dept["icon"],
                    "short_description": dept["short_description"],
                    "description": dept["description"],
                    "services": dept["services"],
                },
            )
            if created:
                created_count += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded departments. {created_count} newly created."))
