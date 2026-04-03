import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import DatePicker from './DatePicker';
import GuestSelector from './GuestSelector';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [dates, setDates] = useState({ checkIn: null, checkOut: null });
    const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });
    const [activeTab, setActiveTab] = useState(null);

    const handleSearchClick = () => {
        if (onSearch) onSearch({ city, dates, guests });
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto -mt-24 md:-mt-16 z-10">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row items-stretch">
                
                {/* City Input */}
                <div 
                    className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => setActiveTab('city')}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin size={16} className="text-[#008cff]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">City / Hotel / Area</span>
                    </div>
                    <input 
                        type="text"
                        placeholder="Where are you going?"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xl font-bold bg-transparent outline-none placeholder:text-gray-300"
                    />
                </div>

                {/* Date Picker Trigger */}
                <div 
                    className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setActiveTab(activeTab === 'dates' ? null : 'dates')}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar size={16} className="text-[#008cff]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Check-In / Check-Out</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">12 Apr - 15 Apr</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    {activeTab === 'dates' && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                            <DatePicker onChange={(d) => setDates(d)} />
                        </div>
                    )}
                </div>

                {/* Guest Selector Trigger */}
                <div 
                    className="flex-1 p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setActiveTab(activeTab === 'guests' ? null : 'guests')}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Users size={16} className="text-[#008cff]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Rooms & Guests</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">{guests.rooms} Room, {guests.adults + guests.children} Guests</span>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    {activeTab === 'guests' && (
                        <div className="absolute top-full right-0 w-80 mt-2 bg-white rounded-xl shadow-2xl p-6 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                            <GuestSelector 
                                values={guests}
                                onChange={(val) => setGuests(val)} 
                                onClose={() => setActiveTab(null)}
                            />
                        </div>
                    )}
                </div>

                {/* Search Button */}
                <button 
                    onClick={handleSearchClick}
                    className="bg-gradient-to-r from-[#008cff] to-[#00a2ff] text-white px-12 py-6 text-xl font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all min-w-[200px]"
                >
                    SEARCH
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
