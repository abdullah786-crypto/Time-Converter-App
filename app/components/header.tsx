import { motion } from "motion/react";
import { Clock } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-6 md:py-8 px-6 flex justify-between items-center max-w-7xl mx-auto z-50 relative"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 md:size-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
          <Clock className="size-6" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Time Converter
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Global Zone Synchronizer
          </p>
        </div>
      </div>
    </motion.header>
  );
}
