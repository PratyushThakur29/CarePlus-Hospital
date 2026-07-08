import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../api/axios";
import DoctorCard from "../components/DoctorCard";
import ErrorMessage from "../components/ErrorMessage";
import Icon from "../components/Icon";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Doctors() {
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState(location.state?.departmentSlug || "");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/departments/")
      .then((res) => {
        const results = Array.isArray(res.data) ? res.data : res.data.results;
        setDepartments(results);
      })
      .catch(() => {
        // Non-critical; the filter dropdown will just be empty.
      });
  }, []);

  const fetchDoctors = () => {
    setIsLoading(true);
    setError("");
    const params = {};
    if (search.trim()) params.search = search.trim();
    if (departmentFilter) params.department = departmentFilter;

    api
      .get("/doctors/", { params })
      .then((res) => {
        const results = Array.isArray(res.data) ? res.data : res.data.results;
        setDoctors(results);
      })
      .catch(() => {
        setError("We couldn't load our doctors right now. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="section-heading">Our Doctors</h1>
        <p className="section-subheading mx-auto">
          Meet our team of experienced, board-certified specialists dedicated to your health.
        </p>
      </div>

      <form onSubmit={handleSearchSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialization..."
            className="input-field pl-9"
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="input-field sm:w-56"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.slug}>
              {dept.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary sm:w-32">
          Search
        </button>
      </form>

      <div className="mt-10">
        {isLoading ? (
          <LoadingSpinner label="Loading doctors..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchDoctors} />
        ) : doctors.length === 0 ? (
          <p className="py-16 text-center text-gray-500">No doctors matched your search. Try a different term.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
