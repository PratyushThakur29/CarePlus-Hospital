import { Link } from "react-router-dom";

import Icon from "./Icon";

export default function DepartmentCard({ department }) {
  return (
    <div className="card flex flex-col p-6 transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-50 text-primary-600">
        <Icon name={department.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{department.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{department.short_description}</p>
      <Link
        to="/doctors"
        state={{ departmentSlug: department.slug }}
        className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        View Doctors
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="ml-1 h-4 w-4">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
