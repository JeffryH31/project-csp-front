import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-b border-zinc-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-4 flex justify-between items-center bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200"
      >
        <span className="text-white font-semibold text-lg">{title}</span>
        <motion.span
          className="text-white text-2xl"
          animate={{ rotate: isOpen ? 90 : 0 }}
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
            <div className="p-4 bg-zinc-800/50 text-zinc-300 text-sm">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
