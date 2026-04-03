import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <span className="text-3xl font-black italic tracking-tighter text-white">MYTRIP</span>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Experience the best travel planning with MyTrip. From budget hotels to luxury stays, 
                            we offer everything to make your journey memorable.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={<Facebook size={18} />} />
                            <SocialLink icon={<Twitter size={18} />} />
                            <SocialLink icon={<Instagram size={18} />} />
                            <SocialLink icon={<Linkedin size={18} />} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Our Services</h4>
                        <ul className="space-y-4 text-sm">
                            <FooterLink>Flight Bookings</FooterLink>
                            <FooterLink>Hotel Reservations</FooterLink>
                            <FooterLink>Bus Tickets</FooterLink>
                            <FooterLink>Train Packages</FooterLink>
                            <FooterLink>International Holidays</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Help & Support</h4>
                        <ul className="space-y-4 text-sm">
                            <FooterLink>Customer Support</FooterLink>
                            <FooterLink>Terms of Service</FooterLink>
                            <FooterLink>Privacy Policy</FooterLink>
                            <FooterLink>Cancellation Policy</FooterLink>
                            <FooterLink>Feedback</FooterLink>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex gap-3">
                                <Mail size={16} className="text-[#008cff]" />
                                <span>support@mytrip.com</span>
                            </div>
                            <div className="flex gap-3">
                                <Phone size={16} className="text-[#008cff]" />
                                <span>+91 1800 123 4567</span>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <MapPin size={16} className="text-[#008cff] shrink-0" />
                                <span>123, Travel Lane, Tech Park, Bangalore, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">© 2026 MyTrip Pvt. Ltd. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                        <img src="https://img.icons8.com/color/48/000000/google-pay.png" alt="GPay" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon }) => (
    <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#008cff] hover:border-[#008cff] hover:text-white transition-all text-gray-500">
        {icon}
    </a>
);

const FooterLink = ({ children }) => (
    <li>
        <a href="#" className="hover:text-[#008cff] transition-colors">{children}</a>
    </li>
);

export default Footer;
