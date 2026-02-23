"use client";

import { useEffect, useState } from "react";
import TimeInputCard from "./components/timeInputCard";
import { TimezoneCard } from "./components/timeZoneCard";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";

export default function TimeConvert() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [inputTime, setInputTime] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Karachi");

  const cardColors: string[] = [
    "#E8EFFF",
    "#FEF3C8",
    "#DEFDF3",
    "#FBF0FF",
    "#fbd9d9",
  ];

  const [timeZones, setTimeZones] = useState([
    { id: "Asia/Karachi", name: "PKT"},
    { id: "UTC", name: "UTC"},
    { id: "America/New_York", name: "EST" },
    { id: "America/Los_Angeles", name: "PST"},
    { id: "America/Chicago", name: "CST"},
  ]);

  const baseDate = inputTime
    ? fromZonedTime(inputTime, selectedTimeZone)
    : currentTime;

  const zoneTime = timeZones.map((zone) =>
    formatInTimeZone(
      baseDate,
      zone.id,
      "dd MMM yyyy, hh:mm a"
    )
  );

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen p-[50px] bg-slate-50 relative overflow-x-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 -z-20" />
      <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-200/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[10000ms]" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-200/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[12000ms]" />

      <div className="max-w-8xl mx-auto sm:px-6 pb-12 pt-2 sm:pt-6">
        <div className="flex flex-col lg:flex-row !items-center gap-8 xl:gap-12 lg:items-start">
          <div className="w-full lg:w-[450px] xl:w-[550px] flex-shrink-0 lg:sticky lg:top-28 z-20">
            <TimeInputCard
              currentTime={inputTime}
              inputTime={inputTime}
              setInputTime={setInputTime}
              timeZones={timeZones}
              selectedTimeZone={selectedTimeZone}
              setSelectedTimeZone={setSelectedTimeZone}
              setCurrentTime={setCurrentTime}
            />
          </div>

          <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {timeZones.map((tz, index) => 
            tz.id !== selectedTimeZone && (
               <TimezoneCard
                key={tz.id}
                cardColors={cardColors[index]}
                time={zoneTime[index]}
                timeZone={tz.name}
                timeZones={timeZones}
                setTimeZone={setTimeZones}
                selectedTimeZone={selectedTimeZone}
                setSelectedTimeZone={setSelectedTimeZone}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}