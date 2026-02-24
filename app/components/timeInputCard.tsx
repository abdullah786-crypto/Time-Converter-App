import { formatInTimeZone } from "date-fns-tz";
import { Calendar, MapPin, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TimeInputCardProps {
  inputTime: string;
  currentTime: string;
  timeZones: { id: string; name: string }[];
  selectedTimeZone: string;
  setInputTime: (value: string) => void;
  setSelectedTimeZone: (val: string) => void;
  setCurrentTime: (val: any) => void;
}

export default function TimeInputCard({
  currentTime,
  inputTime,
  setInputTime,
  timeZones,
  selectedTimeZone,
  setSelectedTimeZone,
  setCurrentTime,
}: TimeInputCardProps) {
  const displayDate = inputTime ? new Date(inputTime) : new Date();

  const timeStr = displayDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: selectedTimeZone,
  });

  const dateStr = displayDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: selectedTimeZone,
  });

  const onSetToNow = () => {
    const now = new Date();
    const formattedNow = formatInTimeZone(
      now,
      "Asia/Karachi",
      "yyyy-MM-dd'T'HH:mm",
    );
    setInputTime( inputTime !== "" ? inputTime = formattedNow : "")
    setSelectedTimeZone("Asia/Karachi");
    setCurrentTime(formattedNow);
  };
  const [updatedTime, setUpdatedTime] = useState("");

  function convertTo12Hour(time24: any) {
    let [hours, minutes] = time24.split(":").map(Number);

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;

    let hoursStr = hours.toString().padStart(2, "0");
    let minutesStr = minutes.toString().padStart(2, "0");

    return `${hoursStr}:${minutesStr} ${period}`;
  }
  useEffect(() => {
    if (inputTime) {
      const date = new Date(inputTime);
      const formatted = formatInTimeZone(
        date,
        selectedTimeZone,
        "yyyy-MM-dd'T'HH:mm",
      );
      setCurrentTime(formatted);
      setUpdatedTime(
        inputTime.includes("T") ? inputTime.replace("T", ",") : inputTime,
      );
    }
  }, [inputTime]);

  let [datePart, timePart] = updatedTime.split(",");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative overflow-hidden rounded-[32px] bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-indigo-500/10 p-5 w-full h-full flex flex-col justify-center gap-8"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10">
        {/* <div className="inline-flex items-center gap-2 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase mb-6">
          <MapPin className="size-4 text-indigo-500" />
          Local Time
        </div> */}

        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
          {timePart ? convertTo12Hour(timePart) : timeStr}
        </h2>
        <p className="text-2xl text-slate-500">
          {datePart ? datePart : dateStr}
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        <label className="block">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-500">
              Select Date & Time
            </span>
            <div className="px-2 py-1 rounded-lg border border-slate-300 bg-white text-sm">
              <select
                value={selectedTimeZone}
                onChange={(e) => {
                  setSelectedTimeZone(e.target.value);
                }}
                className="pr-3 focus:outline-none focus:ring-0 focus:border-none"
              >
                {timeZones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative rounded-2xl bg-white shadow-sm border border-slate-200">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <Calendar className="size-5" />
            </div>
            <input
              type="datetime-local"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-transparent outline-none"
            />
          </div>
        </label>

        <button
          onClick={onSetToNow}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          <RotateCcw className="size-4" />
          Reset to Current Time
        </button>
      </div>
    </motion.div>
  );
}
