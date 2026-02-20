import { Calendar, MapPin, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

interface TimeInputCardProps {
  inputTime: string;
  currentTime: string;
  setInputTime: (value: string) => void;
}

export default function TimeInputCard({
  currentTime,
  inputTime,
  setInputTime,
}: TimeInputCardProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(e.target.value);
  };

  const onSetToNow = () => {
    setInputTime("");
  };

  const formateSelectedTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const [date, year, timeStr] = formateSelectedTime(
    inputTime || currentTime,
  ).split(", ");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative overflow-hidden rounded-[32px] bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-indigo-500/10 p-8 w-full h-full flex flex-col justify-center gap-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex justify-center items-center gap-2 px-3 py-0 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="size-4 text-indigo-500 mb-4 mt-4" />
            Local Time
          </div>

          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">
              {timeStr}
            </h2>
            <p className="text-2xl md:text-3xl text-slate-500 font-medium">
              {date + ", " + year}
            </p>
            <p className="text-lg text-slate-400 font-medium"></p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <label className="block w-full cursor-pointer group">
            <span className="text-sm font-semibold text-slate-500 mb-2 block group-hover:text-indigo-600 transition-colors">
              Select Date & Time
            </span>
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 group-hover:border-indigo-300 transition-all duration-300 ring-offset-2 focus-within:ring-2 ring-indigo-500/20">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
                <Calendar className="size-5" />
              </div>
              <input
                type="datetime-local"
                value={inputTime}
                onChange={handleDateChange}
                className="w-full bg-transparent text-slate-700 font-semibold py-4 pl-12 pr-4 outline-none cursor-pointer"
              />
            </div>
          </label>

          <button
            onClick={onSetToNow}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
          >
            <RotateCcw className="size-4" />
            Reset to Current Time
          </button>
        </div>
      </motion.div>
    </>
  );
}
