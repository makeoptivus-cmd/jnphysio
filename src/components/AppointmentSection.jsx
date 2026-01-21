import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

/* ---------- Helpers ---------- */

// Get available dates (today + next 2 days)
const getAvailableDates = () => {
  const dates = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      iso: date.toISOString().split("T")[0],
      readable: date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      dayName: date.toLocaleDateString("en-IN", { weekday: "long" }),
      dayOfWeek: date.getDay() // 0=Sunday, 1=Monday, etc.
    });
  }
  return dates;
};

const availableDates = getAvailableDates();
const todayISO = availableDates[0].iso;

// Generate time slots based on hospital timings
const generateTimeSlots = (selectedDateISO) => {
  const slots = [];
  const now = new Date();
  const selectedDate = new Date(selectedDateISO);
  const isToday = selectedDateISO === todayISO;
  const dayOfWeek = selectedDate.getDay(); // 0=Sunday, 1=Monday, etc.
  const isSunday = dayOfWeek === 0;

  // Define hospital timings
  let morningStart = 10, morningEnd = 13; // 10 AM to 1 PM
  let eveningStart = 17, eveningEnd = 22; // 5 PM to 10 PM
  
  // Sunday evening ends at 8 PM
  if (isSunday) {
    eveningEnd = 20;
  }

  // Generate morning slots (10 AM - 1 PM)
  for (let h = morningStart; h < morningEnd; h++) {
    for (let m of [0, 15, 30, 45]) {
      const slotTime = new Date(selectedDate);
      slotTime.setHours(h, m, 0, 0);
      
      // Skip if it's today and time has passed
      if (isToday && slotTime <= now) continue;

      const hour12 = h % 12 || 12;
      const ampm = h < 12 ? "AM" : "PM";
      const min = m.toString().padStart(2, "0");

      slots.push({
        value: `${h.toString().padStart(2, "0")}:${min}`,
        label: `${hour12}:${min} ${ampm}`,
        period: "Morning"
      });
    }
  }

  // Generate evening slots (5 PM - 10 PM or 8 PM on Sunday)
  for (let h = eveningStart; h < eveningEnd; h++) {
    for (let m of [0, 15, 30, 45]) {
      const slotTime = new Date(selectedDate);
      slotTime.setHours(h, m, 0, 0);
      
      // Skip if it's today and time has passed
      if (isToday && slotTime <= now) continue;

      const hour12 = h % 12 || 12;
      const ampm = "PM";
      const min = m.toString().padStart(2, "0");

      slots.push({
        value: `${h.toString().padStart(2, "0")}:${min}`,
        label: `${hour12}:${min} ${ampm}`,
        period: "Evening"
      });
    }
  }

  return slots;
};

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

  // Generate time slots based on selected date
  const timeSlots = generateTimeSlots(form.preferred_date);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDateChange = (newDate) => {
    setForm({ 
      ...form, 
      preferred_date: newDate,
      preferred_time: "" // Reset time when date changes
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.full_name || !form.mobile_number || !form.problem || !form.preferred_time) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const payload = {
      full_name: form.full_name,
      mobile_number: form.mobile_number,
      problem: form.problem,
      preferred_date: form.preferred_date || null,
      preferred_time: form.preferred_time || null,
      age: form.age || null,
      gender: form.gender || null,
    };

    const { data, error } = await supabase
      .from("appointments")
      .insert([payload])
      .select();

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

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
  };

  // Group time slots by period
  const morningSlots = timeSlots.filter(slot => slot.period === "Morning");
  const eveningSlots = timeSlots.filter(slot => slot.period === "Evening");

  return (
    <section id="appointment" className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 md:py-12">
      {/* RESPONSIVE CONTAINER */}
      <div className="w-full px-4 sm:px-6 md:px-8 max-w-md md:max-w-2xl mx-auto">

        {/* Title */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Quick and easy – takes less than a minute
          </p>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="bg-white border-2 border-green-500 p-8 md:p-12 rounded-3xl shadow-2xl text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success Message */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Thank You!
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto">
              Your appointment request has been received. Our team will contact you shortly to confirm.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-6 md:p-10">
            {/* Date Selection */}
            <div className="mb-6 md:mb-8">
              <label className="block text-sm md:text-base font-semibold text-gray-700 mb-3">
                Select Appointment Date <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 md:gap-3">
                {availableDates.map((date, index) => (
                  <button
                    key={date.iso}
                    type="button"
                    onClick={() => handleDateChange(date.iso)}
                    className={`flex-1 p-3 md:p-4 rounded-xl border-2 transition-all ${
                      form.preferred_date === date.iso
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    <div className="text-center">
                      <p className={`text-xs md:text-sm font-bold mb-1 ${
                        form.preferred_date === date.iso ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : date.dayName.slice(0, 3)}
                      </p>
                      <p className={`text-[10px] md:text-xs ${
                        form.preferred_date === date.iso ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {new Date(date.iso).getDate()} {new Date(date.iso).toLocaleDateString('en-IN', { month: 'short' })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 md:space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
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
                  className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                />
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Reason for Visit <span className="text-red-500">*</span>
                </label>
                <select
                  name="problem"
                  value={form.problem}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
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

              {/* Age & Gender - Side by Side */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                
                {timeSlots.length === 0 ? (
                  <div className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-yellow-200 bg-yellow-50 rounded-xl md:rounded-2xl text-sm md:text-base text-yellow-800">
                    No available slots for today. Please select a future date.
                  </div>
                ) : (
                  <select
                    name="preferred_time"
                    value={form.preferred_time}
                    onChange={handleChange}
                    className="w-full px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl text-sm md:text-base bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  >
                    <option value="">Select time slot</option>
                    
                    {morningSlots.length > 0 && (
                      <optgroup label="🌅 Morning (10:00 AM - 1:00 PM)">
                        {morningSlots.map((t, i) => (
                          <option key={i} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    
                    {eveningSlots.length > 0 && (
                      <optgroup label={`🌆 Evening (5:00 PM - ${new Date(form.preferred_date).getDay() === 0 ? '8:00' : '10:00'} PM)`}>
                        {eveningSlots.map((t, i) => (
                          <option key={i} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                )}

                {/* Hospital Timings Info */}
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {new Date(form.preferred_date).getDay() === 0 
                    ? "Sunday: 10 AM - 1 PM, 5 PM - 8 PM"
                    : "Mon-Sat: 10 AM - 1 PM, 5 PM - 10 PM"
                  }
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-8 md:mt-10 py-4 md:py-5 text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                backgroundColor: loading ? "#93C5FD" : "#2563EB",
                color: "#FFFFFF",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                "Confirm Appointment"
              )}
            </button>

            <p className="text-xs md:text-sm text-gray-500 text-center mt-4 md:mt-6">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppointmentSection;