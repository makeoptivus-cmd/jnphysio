import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

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

  for (let h = 8; h <= 22; h++) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("appointments").insert([form]);

    setLoading(false);
    if (!error) setSuccess(true);
    else alert("Something went wrong. Please try again.");
  };

  return (
    <section
      id="appointment"
      className="w-full bg-gray-50 py-8"
    >
      {/* MOBILE-FIRST CONTAINER */}
      <div className="w-full px-3 max-w-[420px] mx-auto">

        {/* Title */}
        <h2 className="text-xl font-bold text-center">
          Book Appointment
        </h2>
        <p className="text-xs text-center text-gray-500 mt-1 mb-4">
          Mobile-friendly booking – takes less than a minute
        </p>

        {/* Success */}
        {success ? (
          <div className="bg-green-50 border border-green-200 p-5 rounded-xl text-center">
            <p className="text-green-700 font-semibold">
              ✅ Appointment request received
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            {/* Date */}
            <div className="text-center bg-gray-100 rounded-lg py-2">
              <p className="text-[11px] text-gray-500">Appointment Date</p>
              <p className="text-sm font-semibold">{todayReadable}</p>
            </div>

            {/* Full Name */}
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg text-sm"
            />

            {/* Mobile */}
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              name="mobile_number"
              placeholder="Mobile Number"
              required
              value={form.mobile_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile_number: e.target.value.replace(/\D/g, ""),
                })
              }
              className="w-full px-3 py-3 border rounded-lg text-sm"
            />

            {/* Problem */}
            <select
              name="problem"
              required
              value={form.problem}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg text-sm bg-white"
            >
              <option value="">Reason for Visit</option>
              <option>Neck Pain</option>
              <option>Back Pain</option>
              <option>Knee Pain</option>
              <option>Shoulder Pain</option>
              <option>Sports Injury</option>
              <option>Other</option>
            </select>

            {/* Age & Gender */}
            <div className="flex gap-2">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="w-1/2 px-3 py-3 border rounded-lg text-sm"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-1/2 px-3 py-3 border rounded-lg text-sm bg-white"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Time */}
            <select
              name="preferred_time"
              required
              value={form.preferred_time}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg text-sm bg-white"
            >
              <option value="">Select Time</option>
              {timeSlots.map((t, i) => (
                <option key={i} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Submit – MOBILE OPTIMIZED */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold rounded-lg shadow transition"
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                opacity: loading ? 0.85 : 1,
              }}
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AppointmentSection;
