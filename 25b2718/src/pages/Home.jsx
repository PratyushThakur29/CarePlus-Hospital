import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import DepartmentCard from "../components/DepartmentCard";
import Icon from "../components/Icon";
import LoadingSpinner from "../components/LoadingSpinner";

const stats = [
  { label: "Years of Service", value: "25+" },
  { label: "Expert Doctors", value: "50+" },
  { label: "Departments", value: "8" },
  { label: "Patients Treated", value: "120K+" },
];

const highlights = [
  {
    icon: "shield",
    title: "Accredited Care",
    text: "Nationally accredited facility following strict clinical safety and quality standards.",
  },
  {
    icon: "clock",
    title: "24/7 Emergency Services",
    text: "Round-the-clock emergency department staffed by experienced physicians and nurses.",
  },
  {
    icon: "users",
    title: "Experienced Specialists",
    text: "A multidisciplinary team of specialists across cardiology, orthopedics, neurology, and more.",
  },
  {
    icon: "award",
    title: "Modern Diagnostics",
    text: "Advanced imaging and laboratory technology for faster, more accurate diagnoses.",
  },
];

export default function Home() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/departments/")
      .then((res) => {
        if (isMounted) {
          const results = Array.isArray(res.data) ? res.data : res.data.results;
          setDepartments(results.slice(0, 4));
        }
      })
      .catch(() => {
        // Non-critical for the homepage; fail silently and show nothing.
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
              Trusted Healthcare Since 1999
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Quality Healthcare, Close to Home
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              CarePlus Hospital brings together experienced specialists, modern diagnostics, and
              compassionate care to support you and your family at every stage of life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book-appointment" className="btn-primary">
                Book an Appointment
              </Link>
              <Link to="/doctors" className="btn-secondary">
                Meet Our Doctors
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <p className="text-3xl font-bold text-primary-700">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-heading">Why Patients Choose CarePlus</h2>
          <p className="section-subheading mx-auto">
            We combine clinical excellence with a patient-first approach to make every visit
            comfortable and effective.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary-600">
                <Icon name={item.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments preview */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-heading">Our Departments</h2>
              <p className="section-subheading">
                Specialized care across the departments patients rely on most.
              </p>
            </div>
            <Link to="/departments" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View All Departments &rarr;
            </Link>
          </div>

          {isLoading ? (
            <LoadingSpinner label="Loading departments..." />
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {departments.map((dept) => (
                <DepartmentCard key={dept.id} department={dept} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="card flex flex-col items-center gap-4 bg-primary-700 p-10 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to see a doctor?</h2>
          <p className="max-w-xl text-primary-100">
            Book an appointment online in a few minutes and get matched with the right specialist
            for your needs.
          </p>
          <Link to="/book-appointment" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
