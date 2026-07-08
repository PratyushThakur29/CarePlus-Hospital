import Icon from "../components/Icon";

const values = [
  {
    icon: "heart",
    title: "Compassion",
    text: "We treat every patient with empathy, dignity, and respect, at every stage of their care.",
  },
  {
    icon: "shield",
    title: "Integrity",
    text: "We hold ourselves to the highest standards of honesty and clinical accountability.",
  },
  {
    icon: "award",
    title: "Excellence",
    text: "We continually invest in our people, equipment, and processes to deliver the best outcomes.",
  },
  {
    icon: "users",
    title: "Collaboration",
    text: "Our specialists work together across departments to provide coordinated, whole-person care.",
  },
];

const milestones = [
  { year: "1999", text: "CarePlus Hospital opens its doors with 40 beds and 3 core departments." },
  { year: "2006", text: "Expanded to a 150-bed facility with a dedicated emergency wing." },
  { year: "2014", text: "Launched the Cardiology Catheterization Lab and Neurology Stroke Unit." },
  { year: "2021", text: "Introduced online appointment booking and electronic health records." },
  { year: "2024", text: "Reached over 120,000 patients served across 8 specialty departments." },
];

export default function About() {
  return (
    <div>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            About Us
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold text-gray-900">
            Caring for our community for over 25 years
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            CarePlus Hospital was founded with a simple mission: deliver high-quality, accessible
            healthcare with genuine compassion. Today, we serve as a trusted regional healthcare
            provider across eight specialty departments.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="card p-8">
            <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              To provide accessible, high-quality healthcare that improves the wellbeing of every
              patient we serve, supported by skilled clinicians and modern medical technology.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              To be the region's most trusted healthcare institution, recognized for clinical
              excellence, patient safety, and a genuinely human approach to care.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Our Core Values</h2>
            <p className="section-subheading mx-auto">The principles that guide every decision we make.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <Icon name={value.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-heading">Our Journey</h2>
          <p className="section-subheading mx-auto">Key milestones in the CarePlus Hospital story.</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-6">
          {milestones.map((item) => (
            <div key={item.year} className="flex gap-4">
              <div className="w-16 flex-shrink-0 text-right font-bold text-primary-700">{item.year}</div>
              <div className="border-l-2 border-primary-100 pl-4 pb-6">
                <p className="text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
