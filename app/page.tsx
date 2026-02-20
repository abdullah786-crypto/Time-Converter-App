"use client";

import { useEffect, useState } from "react";
import TimeInputCard from "./components/timeInputCard";
import { TimezoneCard } from "./components/timeZoneCard";

export default function TimeConvert() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [inputTime, setInputTime] = useState("");
  const cardColors: string[] = ["#E8EFFF", "#FEF3C8", "#DEFDF3", "#FBF0FF"];
  const timeZones: { id: string; name: string }[] = [
    {
      id: "UTC",
      name: "UTC",
    },
    {
      id: "America/New_York",
      name: "EST",
    },
    {
      id: "Europe/London",
      name: "UK",
    },
    {
      id: "America/Chicago",
      name: "CST",
    },
  ];

  const formatTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "short",
    day: "2-digit",
    year: "numeric",
  });


  const convertTime = (date: Date) => {
    return timeZones.map((zones) => {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: zones.id,
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    });
  };
  const zoneTime: string[] = inputTime
    ? convertTime(new Date(inputTime))
    : convertTime(currentTime);
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);
  return (
    <>
      <div className="min-h-screen p-[50px] bg-slate-50 relative overflow-x-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 -z-20" />
        <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-200/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[10000ms]" />
        <div className="fixed bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-200/20 rounded-full blur-[120px] -z-10 animate-pulse duration-[12000ms]" />

        {/* <Header /> */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 pb-12 pt-2 sm:pt-6">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 lg:items-start">
            <div className="w-full lg:w-[550px] xl:w-[650px] flex-shrink-0 lg:sticky lg:top-28 z-20 transition-all duration-300">
              <TimeInputCard
                currentTime={formatTime}
                inputTime={inputTime}
                setInputTime={setInputTime}
              />
            </div>

            <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {timeZones.map(
                (tz: { id: string; name: string }, index: number) => (
                  <div key={index + 1} className="min-w-0 w-full flex flex-col">
                    <TimezoneCard
                      cardColors={cardColors[index]}
                      time={zoneTime[index]}
                      timeZone={tz.name}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
