import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const initialForm = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone_number: "",
  password: "",
  confirm_password: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!form.username.trim()) newErrors.username = "Username is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address.";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirm_password) newErrors.confirm_password = "Passwords do not match.";
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
      await register(form);
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        setErrors(data);
        toast.error("Please fix the errors in the form.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (name) => (Array.isArray(errors[name]) ? errors[name][0] : errors[name]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-500">Register to book appointments with our doctors.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label" htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={form.first_name}
                onChange={handleChange}
                className="input-field"
              />
              {fieldError("first_name") && <p className="form-error">{fieldError("first_name")}</p>}
            </div>
            <div>
              <label className="form-label" htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={form.last_name}
                onChange={handleChange}
                className="input-field"
              />
              {fieldError("last_name") && <p className="form-error">{fieldError("last_name")}</p>}
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="input-field"
            />
            {fieldError("username") && <p className="form-error">{fieldError("username")}</p>}
          </div>

          <div>
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input-field"
            />
            {fieldError("email") && <p className="form-error">{fieldError("email")}</p>}
          </div>

          <div>
            <label className="form-label" htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={form.phone_number}
              onChange={handleChange}
              className="input-field"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="input-field"
            />
            {fieldError("password") && <p className="form-error">{fieldError("password")}</p>}
          </div>

          <div>
            <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={form.confirm_password}
              onChange={handleChange}
              className="input-field"
            />
            {fieldError("confirm_password") && <p className="form-error">{fieldError("confirm_password")}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
