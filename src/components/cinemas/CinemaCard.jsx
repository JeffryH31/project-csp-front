import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CinemaCard = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden glow-box">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-white/10 transition-colors duration-200"
      >
        <span className="text-white font-semibold text-lg">{title}</span>
        <motion.span
          className="text-white text-2xl"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-white/10 text-zinc-300 text-sm">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinemaCard;
