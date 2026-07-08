import { useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";
import Icon from "../components/Icon";

const initialForm = { name: "", email: "", phone_number: "", subject: "", message: "" };

export default function Contact() {
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
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters.";
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
      await api.post("/contact/", form);
      toast.success("Your message has been sent. We'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        setErrors(data);
        toast.error("Please fix the errors in the form.");
      } else {
        toast.error("Could not send your message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (name) => (Array.isArray(errors[name]) ? errors[name][0] : errors[name]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="section-heading">Contact Us</h1>
        <p className="section-subheading mx-auto">
          Have a question or need help? Send us a message and our team will respond promptly.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="card space-y-5 p-6">
          <div className="flex items-start gap-3">
            <Icon name="location" className="mt-0.5 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-500">142 Wellness Avenue, Shimla, HP 171001</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="phone" className="mt-0.5 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="mail" className="mt-0.5 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-500">care@careplushospital.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="clock" className="mt-0.5 h-5 w-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Hours</p>
              <p className="text-sm text-gray-500">Outpatient: Mon - Sat, 8am - 8pm</p>
              <p className="text-sm text-gray-500">Emergency: 24/7</p>
            </div>
          </div>
        </div>

        <div className="card p-8 lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="form-label" htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="input-field" />
                {fieldError("name") && <p className="form-error">{fieldError("name")}</p>}
              </div>
              <div>
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
                {fieldError("email") && <p className="form-error">{fieldError("email")}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <label className="form-label" htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} className="input-field" />
                {fieldError("subject") && <p className="form-error">{fieldError("subject")}</p>}
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="input-field"
              />
              {fieldError("message") && <p className="form-error">{fieldError("message")}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
