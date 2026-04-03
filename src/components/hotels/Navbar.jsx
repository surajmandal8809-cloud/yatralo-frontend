import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Hotel, Train, Bus, UserCircle } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-3xl font-black italic tracking-tighter text-[#008cff]">MYTRIP</span>
                    </Link>
                    
                    <div className="hidden md:flex items-center gap-1">
                        <NavItem icon={<Plane size={18} />} label="Flights" to="/flights" />
                        <NavItem icon={<Hotel size={18} />} label="Hotels" to="/hotels" active />
                        <NavItem icon={<Train size={18} />} label="Trains" to="/trains" />
                        <NavItem icon={<Bus size={18} />} label="Buses" to="/buses" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-all border border-gray-100">
                        <UserCircle size={20} />
                        <span>Login or Create Account</span>
                    </button>
                    <button className="bg-gradient-to-r from-[#008cff] to-[#00a2ff] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
                        Offers
                    </button>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ icon, label, to, active }) => (
    <Link 
        to={to} 
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all group ${
            active ? 'text-[#008cff] border-b-2 border-[#008cff]' : 'text-gray-500 hover:text-gray-900'
        }`}
    >
        <span className={`${active ? 'text-[#008cff]' : 'text-gray-400 group-hover:text-gray-700'}`}>{icon}</span>
        {label}
    </Link>
);

export default Navbar;
