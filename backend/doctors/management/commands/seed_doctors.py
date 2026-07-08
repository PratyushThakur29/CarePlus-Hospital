from django.core.management.base import BaseCommand

from departments.models import Department
from doctors.models import Doctor

DOCTORS = [
    {
        "first_name": "Anjali",
        "last_name": "Mehra",
        "department": "Cardiology",
        "specialization": "Interventional Cardiologist",
        "qualifications": "MBBS, MD, DM (Cardiology)",
        "years_of_experience": 15,
        "bio": (
            "Dr. Anjali Mehra specializes in interventional cardiology with a focus on "
            "coronary artery disease and structural heart interventions. She has performed "
            "over 3,000 catheterization procedures."
        ),
        "available_days": "Monday, Wednesday, Friday",
        "consultation_fee": 1200,
    },
    {
        "first_name": "Rohit",
        "last_name": "Kapoor",
        "department": "Cardiology",
        "specialization": "Cardiac Electrophysiologist",
        "qualifications": "MBBS, MD, DM (Cardiology)",
        "years_of_experience": 11,
        "bio": (
            "Dr. Rohit Kapoor treats heart rhythm disorders including arrhythmia and "
            "atrial fibrillation, and leads the hospital's pacemaker implantation program."
        ),
        "available_days": "Tuesday, Thursday, Saturday",
        "consultation_fee": 1100,
    },
    {
        "first_name": "Sunita",
        "last_name": "Rao",
        "department": "Orthopedics",
        "specialization": "Joint Replacement Surgeon",
        "qualifications": "MBBS, MS (Orthopedics)",
        "years_of_experience": 18,
        "bio": (
            "Dr. Sunita Rao is a specialist in hip and knee replacement surgery, known for "
            "her minimally invasive surgical approach and focus on faster patient recovery."
        ),
        "available_days": "Monday - Friday",
        "consultation_fee": 1000,
    },
    {
        "first_name": "Vikram",
        "last_name": "Singh",
        "department": "Orthopedics",
        "specialization": "Sports Medicine Specialist",
        "qualifications": "MBBS, MS (Orthopedics), Fellowship in Sports Medicine",
        "years_of_experience": 9,
        "bio": (
            "Dr. Vikram Singh works closely with athletes and active patients to treat "
            "ligament injuries, fractures, and overuse injuries, helping patients safely "
            "return to activity."
        ),
        "available_days": "Monday, Tuesday, Thursday",
        "consultation_fee": 900,
    },
    {
        "first_name": "Neha",
        "last_name": "Choudhary",
        "department": "Neurology",
        "specialization": "Neurologist - Stroke & Epilepsy",
        "qualifications": "MBBS, MD, DM (Neurology)",
        "years_of_experience": 13,
        "bio": (
            "Dr. Neha Choudhary specializes in acute stroke management and long-term "
            "epilepsy care, and leads the hospital's stroke rapid-response unit."
        ),
        "available_days": "Monday, Wednesday, Friday",
        "consultation_fee": 1300,
    },
    {
        "first_name": "Arjun",
        "last_name": "Nair",
        "department": "Pediatrics",
        "specialization": "Pediatrician",
        "qualifications": "MBBS, MD (Pediatrics)",
        "years_of_experience": 10,
        "bio": (
            "Dr. Arjun Nair provides comprehensive care for infants and children, with a "
            "special interest in childhood nutrition and developmental milestones."
        ),
        "available_days": "Monday - Saturday",
        "consultation_fee": 700,
    },
    {
        "first_name": "Priya",
        "last_name": "Iyer",
        "department": "Pediatrics",
        "specialization": "Pediatric Neonatologist",
        "qualifications": "MBBS, MD (Pediatrics), Fellowship in Neonatology",
        "years_of_experience": 12,
        "bio": (
            "Dr. Priya Iyer cares for newborns, including premature infants, and works "
            "closely with the hospital's neonatal intensive care unit."
        ),
        "available_days": "Tuesday, Thursday, Saturday",
        "consultation_fee": 800,
    },
    {
        "first_name": "Karan",
        "last_name": "Malhotra",
        "department": "Dermatology",
        "specialization": "Dermatologist",
        "qualifications": "MBBS, MD (Dermatology)",
        "years_of_experience": 8,
        "bio": (
            "Dr. Karan Malhotra treats a wide range of skin, hair, and nail conditions "
            "and performs skin cancer screenings and minor dermatologic procedures."
        ),
        "available_days": "Monday, Wednesday, Friday",
        "consultation_fee": 800,
    },
    {
        "first_name": "Meera",
        "last_name": "Deshpande",
        "department": "Gynecology",
        "specialization": "Obstetrician & Gynecologist",
        "qualifications": "MBBS, MS (Obstetrics & Gynecology)",
        "years_of_experience": 16,
        "bio": (
            "Dr. Meera Deshpande provides prenatal, delivery, and postnatal care, along "
            "with general gynecological services for women at every life stage."
        ),
        "available_days": "Monday - Friday",
        "consultation_fee": 1000,
    },
    {
        "first_name": "Sameer",
        "last_name": "Bhatt",
        "department": "General Surgery",
        "specialization": "General & Laparoscopic Surgeon",
        "qualifications": "MBBS, MS (General Surgery)",
        "years_of_experience": 14,
        "bio": (
            "Dr. Sameer Bhatt specializes in minimally invasive laparoscopic procedures, "
            "including gallbladder and hernia surgery, with an emphasis on faster recovery."
        ),
        "available_days": "Tuesday, Wednesday, Friday",
        "consultation_fee": 1100,
    },
    {
        "first_name": "Divya",
        "last_name": "Krishnan",
        "department": "Emergency Medicine",
        "specialization": "Emergency Medicine Physician",
        "qualifications": "MBBS, MD (Emergency Medicine)",
        "years_of_experience": 7,
        "bio": (
            "Dr. Divya Krishnan leads shifts in the emergency department, managing trauma "
            "cases and acute medical emergencies around the clock."
        ),
        "available_days": "Rotating Shifts, 24/7 Coverage",
        "consultation_fee": 600,
    },
    {
        "first_name": "Aditya",
        "last_name": "Verma",
        "department": "Neurology",
        "specialization": "Movement Disorder Specialist",
        "qualifications": "MBBS, MD, DM (Neurology)",
        "years_of_experience": 10,
        "bio": (
            "Dr. Aditya Verma specializes in Parkinson's disease and other movement "
            "disorders, offering both medical management and referral for advanced therapies."
        ),
        "available_days": "Monday, Thursday",
        "consultation_fee": 1200,
    },
]


class Command(BaseCommand):
    help = "Seeds the database with realistic doctor profiles. Run seed_departments first."

    def handle(self, *args, **options):
        created_count = 0
        skipped = 0
        for doc in DOCTORS:
            try:
                department = Department.objects.get(name=doc["department"])
            except Department.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(
                        f"Department '{doc['department']}' not found. Run seed_departments first. Skipping {doc['first_name']} {doc['last_name']}."
                    )
                )
                skipped += 1
                continue

            _, created = Doctor.objects.update_or_create(
                first_name=doc["first_name"],
                last_name=doc["last_name"],
                defaults={
                    "department": department,
                    "specialization": doc["specialization"],
                    "qualifications": doc["qualifications"],
                    "years_of_experience": doc["years_of_experience"],
                    "bio": doc["bio"],
                    "available_days": doc["available_days"],
                    "consultation_fee": doc["consultation_fee"],
                    "email": f"{doc['first_name'].lower()}.{doc['last_name'].lower()}@careplushospital.com",
                },
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Seeded doctors. {created_count} newly created, {skipped} skipped.")
        )
