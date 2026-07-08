import { Link } from "react-router-dom";

import Icon from "./Icon";

export default function DoctorCard({ doctor }) {
  return (
    <div className="card flex flex-col p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <Icon name="stethoscope" className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{doctor.full_name}</h3>
          <p className="text-sm font-medium text-primary-600">{doctor.specialization}</p>
          <p className="mt-0.5 text-xs text-gray-500">{doctor.department?.name}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{doctor.bio}</p>

      <dl className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <dt className="text-gray-500">Qualifications</dt>
          <dd className="font-medium text-gray-800">{doctor.qualifications}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Experience</dt>
          <dd className="font-medium text-gray-800">{doctor.years_of_experience} years</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Available</dt>
          <dd className="font-medium text-gray-800">{doctor.available_days}</dd>
        </div>
      </dl>

      <Link to="/book-appointment" state={{ doctorId: doctor.id }} className="btn-primary mt-5 w-full">
        Book Appointment
      </Link>
    </div>
  );
}
