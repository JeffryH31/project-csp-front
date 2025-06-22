import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AxiosInstance } from "../../helper/AxiosInstance";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";

const AuthInput = ({ id, name, type, placeholder, value, onChange, icon }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </span>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
    />
  </div>
);

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const instance = AxiosInstance();
  const { login } = useAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLoginMode ? "/login" : "/register";
    let payload = {
      email: formData.email,
      password: formData.password,
    };

    if (!isLoginMode) {
      if (formData.password !== formData.password_confirmation) {
        toast.error("Password confirmation does not match.");
        setIsLoading(false);
        return;
      }
      payload = { ...formData };
    }

    try {
      const response = await instance.post(endpoint, payload);
      const { token, user } = response.data;

      login(user, token);

      toast.success(
        isLoginMode ? "Login successful!" : "Registration successful!"
      );
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Failed to ${isLoginMode ? "login" : "register"}.`;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const iconProps = { className: "h-5 w-5 text-zinc-500" };
  const icons = {
    user: (
      <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    email: (
      <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    phone: (
      <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    lock: (
      <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  };

  return (
    <div className="aurora-background min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 w-auto mx-auto" />
          </Link>
        </div>

        <motion.div
          key={isLoginMode ? "login" : "register"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-zinc-400 text-center mb-8">
            {isLoginMode
              ? "Sign in to continue"
              : "Get started with a new account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginMode && (
              <>
                <AuthInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={icons.user}
                />
                <AuthInput
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  icon={icons.phone}
                />
              </>
            )}
            <AuthInput
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              icon={icons.email}
            />
            <AuthInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              icon={icons.lock}
            />
            {!isLoginMode && (
              <AuthInput
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                icon={icons.lock}
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 disabled:bg-cyan-800 disabled:cursor-wait transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : isLoginMode ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-zinc-400 text-sm mt-8">
            {isLoginMode
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={handleToggleMode}
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              {isLoginMode ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
