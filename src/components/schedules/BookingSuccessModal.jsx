import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookingSuccessModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-zinc-900 p-8 rounded-2xl text-center w-full max-w-sm flex flex-col items-center shadow-2xl shadow-cyan-500/10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <svg
                className="w-12 h-12 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Booking Successful!
            </h2>
            <p className="text-zinc-400 mb-8">
              Your e-ticket has been sent to your email.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingSuccessModal;
