import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-base font-bold text-white">CarePlus Hospital</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Trusted, modern healthcare with experienced doctors, advanced diagnostics, and
              compassionate patient care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/doctors" className="hover:text-white">Our Doctors</Link></li>
              <li><Link to="/departments" className="hover:text-white">Departments</Link></li>
              <li><Link to="/book-appointment" className="hover:text-white">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Departments</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><span className="text-gray-400">Cardiology</span></li>
              <li><span className="text-gray-400">Orthopedics</span></li>
              <li><span className="text-gray-400">Neurology</span></li>
              <li><span className="text-gray-400">Pediatrics</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>142 Wellness Avenue, Shimla, HP 171001</li>
              <li>+91 98765 43210</li>
              <li>care@careplushospital.com</li>
              <li>Emergency: 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; {year} CarePlus Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
