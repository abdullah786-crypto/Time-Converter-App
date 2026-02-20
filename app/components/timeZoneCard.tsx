import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function TimezoneCard({ timeZone, time, cardColors }: any) {
  const [date, setDate] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const [date, year, timeStr] = time.split(",");
    setDate(date);
    setYear(year);
    setTimeStr(timeStr);
    console.log("time is", timeStr);
    console.log("date is", date);
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
                {date + ", " + year}
              </div>
            </div>
          </div>

          {/* <div className=""> */}
          {/* <div> */}
          {/* sdgs */}
          {/* <h3 className={cn("text-xl font-bold tracking-tight")}>{"city"}</h3> */}
          {/* <p className={cn("text-sm font-medium opacity-70", )}>{"country"}</p> */}
          {/* </div> */}
          {/* <div className="rounded-full px-3 py-1 text-xs font-bold border backdrop-blur-md bg-white/20 border-white/30 uppercase tracking-wider"> */}
          {/* {offsetStr} */}
          {/* sdgsfg */}
          {/* </div> */}
          {/* </div> */}

          {/* <div className="z-10 relative mt-auto">
        <div className="flex items-baseline gap-1.5">
          <span className={cn("text-5xl font-bold tracking-tighter", )}>{"timeStr"}</span>
          <span className={cn("text-lg font-semibold opacity-60", )}>{"amPmStr"}</span>
        </div> */}
          {/* <div className={cn("flex items-center gap-2 mt-2 font-medium text-sm opacity-80", )}> */}
          {/* {isNight ? <Moon className="size-4" strokeWidth={2.5} /> : <Sun className="size-4" strokeWidth={2.5} />}
          {dateStr} */}
          {/* </div>
      </div> */}

          {/* Decorative gradient blob */}
          {/* <div className={cn("absolute -bottom-12 -right-12 size-48 rounded-full blur-3xl opacity-50 mix-blend-overlay pointer-events-none")} /> */}
        </motion.div>
      </div>
    </>
  );
}
