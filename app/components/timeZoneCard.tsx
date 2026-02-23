import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function TimezoneCard({ timeZone, time, cardColors, timeZones, setTimeZone, selectedTimeZone, setSelectedTimeZone}: any) {
  const [date, setDate] = useState("");
  const [timeStr, setTimeStr] = useState("");
  
  useEffect(() => {
    const [date, timeStr] = time.split(",");
    setDate(date);
    setTimeStr(timeStr);
  }, [time]);

  return (
    <>
      <div
        style={{ background: cardColors }}
        className="inset-shadow-sm rounded-[24px] inset-shadow-indigo-500/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="relative rounded-[24px] p-6 h-auto w-full transition-shadow duration-300 shadow-sm hover:shadow-xl border border-white/50"
        >
          <div className="flex flex-col h-auto text-center">
            <h1 className="font-bold text-start text-[20px] text-[#1E1A4D]">
              {timeZone}
            </h1>
            <div className="flex justify-between items-center flex-row">
              <span className="font-bold text-start text-[#162556] text-[40px]">
                {timeStr}
              </span>
              <div className="text-end text-slate-600 font-medium ">
                {date }
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
