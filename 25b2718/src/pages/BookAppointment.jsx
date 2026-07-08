import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const initialForm = {
  doctor_id: "",
  appointment_date: "",
  appointment_time: "",
  reason: "",
};

export default function BookAppointment() {
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [form, setForm] = useState({ ...initialForm, doctor_id: location.state?.doctorId || "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    api
      .get("/doctors/")
      .then((res) => {
        const results = Array.isArray(res.data) ? res.data : res.data.results;
        setDoctors(results);
      })
      .catch(() => toast.error("Could not load the doctor list."))
      .finally(() => setIsLoadingDoctors(false));

    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    setIsLoadingAppointments(true);
    api
      .get("/appointments/")
      .then((res) => {
        const results = Array.isArray(res.data) ? res.data : res.data.results;
        setAppointments(results);
      })
      .catch(() => {
        // Non-critical; the "your appointments" list will just stay empty.
      })
      .finally(() => setIsLoadingAppointments(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.doctor_id) newErrors.doctor_id = "Please select a doctor.";
    if (!form.appointment_date) newErrors.appointment_date = "Please select a date.";
    if (!form.appointment_time) newErrors.appointment_time = "Please select a time.";
    if (!form.reason.trim() || form.reason.trim().length < 5) {
      newErrors.reason = "Please describe the reason for your visit (min. 5 characters).";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/appointments/", form);
      toast.success("Appointment booked successfully!");
      setForm(initialForm);
      fetchAppointments();
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        setErrors(data);
        toast.error("Please fix the errors in the form.");
      } else {
        toast.error("Could not book the appointment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (name) => (Array.isArray(errors[name]) ? errors[name][0] : errors[name]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="section-heading">Book an Appointment</h1>
        <p className="section-subheading mx-auto">
          Choose your doctor, pick a convenient date and time, and we&apos;ll confirm your visit.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="card p-8 lg:col-span-2">
          {isLoadingDoctors ? (
            <LoadingSpinner label="Loading doctors..." />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="form-label" htmlFor="doctor_id">Doctor</label>
                <select
                  id="doctor_id"
                  name="doctor_id"
                  value={form.doctor_id}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.full_name} — {doctor.specialization}
                    </option>
                  ))}
                </select>
                {fieldError("doctor_id") && <p className="form-error">{fieldError("doctor_id")}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="appointment_date">Date</label>
                  <input
                    id="appointment_date"
                    name="appointment_date"
                    type="date"
                    min={today}
                    value={form.appointment_date}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {fieldError("appointment_date") && <p className="form-error">{fieldError("appointment_date")}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="appointment_time">Time</label>
                  <input
                    id="appointment_time"
                    name="appointment_time"
                    type="time"
                    value={form.appointment_time}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {fieldError("appointment_time") && <p className="form-error">{fieldError("appointment_time")}</p>}
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="reason">Reason for Visit</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={form.reason}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Briefly describe your symptoms or reason for the visit"
                />
                {fieldError("reason") && <p className="form-error">{fieldError("reason")}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? "Booking..." : "Confirm Appointment"}
              </button>
            </form>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-gray-900">Your Appointments</h2>
          {isLoadingAppointments ? (
            <LoadingSpinner label="Loading..." />
          ) : appointments.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">You have no appointments yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {appointments.map((appt) => (
                <li key={appt.id} className="rounded-md border border-gray-100 p-3 text-sm">
                  <p className="font-medium text-gray-900">{appt.doctor.full_name}</p>
                  <p className="text-gray-500">{appt.appointment_date} at {appt.appointment_time}</p>
                  <span className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium capitalize text-primary-700">
                    {appt.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
