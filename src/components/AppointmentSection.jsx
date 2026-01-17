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

  for (let h = 8; h <= 20; h++) {
    // Clinic time: 8 AM – 8 PM
    for (let m of [0, 30]) {
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);

      // Allow only future times
      if (slotTime > now) {
        let hour12 = h % 12 || 12;
        let ampm = h < 12 ? "AM" : "PM";
        let minutes = m === 0 ? "00" : m;

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

  return (
    <section id="appointment" className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Book Appointment
      </h2>

      <div className="flex justify-center">
        {success ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center max-w-md w-full">
            <h3 className="text-xl font-semibold text-green-700">
              ✅ Appointment Request Sent!
            </h3>
            <p className="mt-2 text-gray-600">
              Thank you for booking. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 w-full max-w-md md:max-w-3xl"
          >
            {/* Fixed Date Display */}
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-500">Appointment Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {todayReadable}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                required
                value={form.full_name}
                onChange={handleChange}
                className="input"
              />

              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                name="mobile_number"
                placeholder="Mobile Number"
                required
                value={form.mobile_number}
                onChange={handleChange}
                className="input"
              />

              <select
                name="problem"
                required
                value={form.problem}
                onChange={handleChange}
                className="input"
              >
                <option value="">Reason for Visit</option>
                <option>Neck Pain</option>
                <option>Back Pain</option>
                <option>Knee Pain</option>
                <option>Shoulder Pain</option>
                <option>Sports Injury</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="input"
              />

              {/* 12-hour Time Dropdown */}
              <select
                name="preferred_time"
                required
                value={form.preferred_time}
                onChange={handleChange}
                className="input md:col-span-2"
              >
                <option value="">Select Time</option>
                {timeSlots.length === 0 ? (
                  <option disabled>No slots available today</option>
                ) : (
                  timeSlots.map((slot, i) => (
                    <option key={i} value={slot.value}>
                      {slot.label}
                    </option>
                  ))
                )}
              </select>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="input md:col-span-2"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 text-lg font-semibold rounded-xl"
              style={{
                backgroundColor: "#2563eb",
                color: "#ffffff",
              }}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AppointmentSection;
