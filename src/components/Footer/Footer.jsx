import React from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "About Us", path: "#" },
    { name: "Destinations", path: "/destinations" },
    { name: "Deals", path: "/deals" },
    { name: "Benefits", path: "/benefits" },
    { name: "Help Center", path: "/help" },
  ];

  return (
    <footer className="bg-gray-100 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Logo & About */}
        <div>
          <Logo />
          <p className="text-sm text-gray-600 mt-3">
            Yatralo helps you book flights, hotels, buses and trains easily
            with the best travel deals.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="text-gray-600 hover:text-black text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-600">Chandigarh, India</p>
          <p className="text-sm text-gray-600">+91 90400 27584</p>
          <p className="text-sm text-gray-600">support@yatralo.com</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {year} Yatralo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;