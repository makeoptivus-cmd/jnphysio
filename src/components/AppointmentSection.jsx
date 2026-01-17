import { useState } from "react";

/* ---------- Helpers ---------- */

// Today
const today = new Date();
const todayISO = today.toISOString().split("T")[0];
const todayReadable = today.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Time slots: 8 AM – 10 PM (15 mins)
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();

  for (let h = 8; h <= 24; h++) {
    for (let m of [0, 15, 30, 45]) {
      if (h === 22 && m > 0) continue;

      const t = new Date();
      t.setHours(h, m, 0, 0);
      if (t <= now) continue;

      const hour12 = h % 12 || 12;
      const ampm = h < 12 ? "AM" : "PM";
      const min = m.toString().padStart(2, "0");

      slots.push({
        value: `${h.toString().padStart(2, "0")}:${min}`,
        label: `${hour12}:${min} ${ampm}`,
      });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const AppointmentSection = () => {
  const [form, setForm] = useState({
    full_name: "",
    mobile_number: "",
    problem: "",
    preferred_date: todayISO,
    preferred_time: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    // Validation
    if (!form.full_name || !form.mobile_number || !form.problem || !form.preferred_time) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    // Simulate API call (replace with actual Supabase call)
    // const { error } = await supabase.from("appointments").insert([form]);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <section
      id="appointment"
      className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 md:py-16"
    >
      {/* RESPONSIVE CONTAINER */}
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-[420px] md:max-w-2xl lg:max-w-3xl mx-auto">

        {/* Title */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Quick and easy booking – we'll confirm within minutes
          </p>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-6 md:p-8 rounded-2xl text-center shadow-lg">
            <div className="text-5xl md:text-6xl mb-4">✅</div>
            <p className="text-green-800 font-bold text-xl md:text-2xl mb-2">
              Appointment Request Received!
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              Our team will contact you shortly to confirm your appointment.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Book Another
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 lg:p-10">
            {/* Date Display */}
            <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl py-3 md:py-4 mb-6">
              <p className="text-xs md:text-sm text-gray-600 mb-1">Appointment Date</p>
              <p className="text-base md:text-xl font-bold text-gray-900">{todayReadable}</p>
            </div>

            {/* Form Grid - 2 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Mobile Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  name="mobile_number"
                  placeholder="10-digit mobile number"
                  value={form.mobile_number}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mobile_number: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Your age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl text-sm md:text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Problem/Reason */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit *
                </label>
                <select
                  name="problem"
                  value={form.problem}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl text-sm md:text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select your concern</option>
                  <option>Neck Pain</option>
                  <option>Back Pain</option>
                  <option>Knee Pain</option>
                  <option>Shoulder Pain</option>
                  <option>Sports Injury</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Preferred Time */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="preferred_time"
                  value={form.preferred_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border border-gray-300 rounded-xl text-sm md:text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((t, i) => (
                    <option key={i} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-8 py-4 md:py-5 text-base md:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: loading ? "#93C5FD" : "#2563EB",
                color: "#FFFFFF",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                "Confirm Appointment"
              )}
            </button>

            <p className="text-xs md:text-sm text-gray-500 text-center mt-4">
              * Required fields
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppointmentSection;