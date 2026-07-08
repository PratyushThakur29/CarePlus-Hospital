import { useEffect, useState } from "react";

import api from "../api/axios";
import DepartmentCard from "../components/DepartmentCard";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = () => {
    setIsLoading(true);
    setError("");
    api
      .get("/departments/")
      .then((res) => {
        const results = Array.isArray(res.data) ? res.data : res.data.results;
        setDepartments(results);
      })
      .catch(() => {
        setError("We couldn't load our departments right now. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="section-heading">Our Departments</h1>
        <p className="section-subheading mx-auto">
          Specialized departments staffed by experienced physicians, equipped with modern
          diagnostic and treatment technology.
        </p>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <LoadingSpinner label="Loading departments..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchDepartments} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
