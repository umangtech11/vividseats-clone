import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {/* Background Blur */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          className="bg-gray-900/80 p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-gray-700 backdrop-blur-xl relative"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {/* FORM */}
          <div className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 outline-none"
            />

            <button className="w-full bg-blue-600 py-3 rounded-xl hover:bg-blue-500 transition">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </div>

          {/* SWITCH MODE */}
          <p className="text-gray-400 text-center mt-4">
            {isLogin ? (
              <>
                Don’t have an account?
                <span
                  className="text-blue-400 ml-1 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?
                <span
                  className="text-blue-400 ml-1 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
