import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

/* ---------- Helpers ---------- */

// Today date
const todayDate = new Date();
const todayISO = todayDate.toISOString().split("T")[0];
const todayReadable = todayDate.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Generate 12-hour time slots (every 30 mins)
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();

  for (let h = 8; h <= 22; h++) {
    for (let m of [0, 15, 30, 45]) {
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);

      if (slotTime > now) {
        const hour12 = h % 12 || 12;
        const ampm = h < 12 ? "AM" : "PM";
        const minutes = m === 0 ? "00" : m;

        slots.push({
          value: `${h.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}`,
          label: `${hour12}:${minutes} ${ampm}`,
        });
      }
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("appointments").insert([form]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
      setForm({
        full_name: "",
        mobile_number: "",
        problem: "",
        preferred_date: todayISO,
        preferred_time: "",
        age: "",
        gender: "",
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const scrollToForm = () => {
    document
      .getElementById("appointment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="appointment"
      className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">
          Book Appointment
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Quick & easy booking – takes less than 1 minute
        </p>

        {/* 🔵 TOP CTA BUTTON (NEW) */}
        {!success && (
          <button
            onClick={scrollToForm}
            className="w-full mb-6 py-4 text-lg font-semibold rounded-2xl text-white bg-blue-600 shadow-md active:scale-[0.98] transition"
          >
            Book Appointment Now
          </button>
        )}

        {success ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center">
            <h3 className="text-lg font-semibold text-green-700">
              ✅ Appointment Request Sent
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for booking. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form
            id="appointment-form"
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-5 space-y-4"
          >
            {/* Date Display */}
            <div className="text-center bg-gray-100 rounded-xl py-3">
              <p className="text-xs text-gray-500">Appointment Date</p>
              <p className="text-base font-semibold text-gray-800">
                {todayReadable}
              </p>
            </div>

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-base focus:outline-none focus:border-blue-600"
            />

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
              className="w-full px-4 py-3 border rounded-xl text-base focus:outline-none focus:border-blue-600"
            />

            <select
              name="problem"
              required
              value={form.problem}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-base bg-white focus:outline-none focus:border-blue-600"
            >
              <option value="">Reason for Visit</option>
              <option>Neck Pain</option>
              <option>Back Pain</option>
              <option>Knee Pain</option>
              <option>Shoulder Pain</option>
              <option>Sports Injury</option>
              <option>Other</option>
            </select>

            <div className="flex gap-3">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="w-1/2 px-4 py-3 border rounded-xl text-base focus:outline-none focus:border-blue-600"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-1/2 px-4 py-3 border rounded-xl text-base bg-white focus:outline-none focus:border-blue-600"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <select
              name="preferred_time"
              required
              value={form.preferred_time}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-base bg-white focus:outline-none focus:border-blue-600"
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot, i) => (
                <option key={i} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>

            {/* Submit */}
            <div className="pt-2">
  <button
    type="submit"
    disabled={loading}
    className="w-full py-4 text-lg font-semibold rounded-2xl shadow-md active:scale-[0.98] transition"
    style={{
      backgroundColor: "#2563EB", // Tailwind blue-600
      color: "#FFFFFF",           // white text
      opacity: loading ? 0.8 : 1,
    }}
  >
    {loading ? "Booking..." : "Confirm Appointment"}
  </button>
</div>


          </form>
        )}
      </div>
    </section>
  );
};

export default AppointmentSection;
