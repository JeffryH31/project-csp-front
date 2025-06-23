import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-zinc-400 hover:text-cyan-400 transition-colors duration-300"
  >
    {children}
  </Link>
);

const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-500 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="aurora-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <p className="text-zinc-400 text-sm leading-relaxed">
              Your one-stop destination for the latest movies and seamless
              ticket booking.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-white tracking-wider uppercase">
              Navigasi
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <FooterLink to="/movies">Now Showing</FooterLink>
              </li>
              <li>
                <FooterLink to="/my-tickets">My Tickets</FooterLink>
              </li>
              <li>
                <FooterLink to="/theaters">Theaters</FooterLink>
              </li>
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-white tracking-wider uppercase">
              Informasi
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <FooterLink to="/faq">FAQ</FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </li>
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-white tracking-wider uppercase">
              Ikuti Kami
            </h3>
            <div className="flex space-x-5">
              <SocialIcon href="https://twitter.com">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://instagram.com">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0-2a7 7 0 110 14 7 7 0 010-14zm6.406-1.146a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://youtube.com">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.502 2.502 0 01-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.502 2.502 0 01-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.502 2.502 0 011.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.5 15.5V8.5l6 3.5-6 3.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} JEGTV. Dibuat dengan sepenuh
            hati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
