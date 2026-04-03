import React from 'react';

const DatePicker = ({ onChange }) => {
    // Premium Placeholder Calendar UI
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="p-4 select-none">
            <div className="flex justify-between items-center mb-6 px-2">
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">←</button>
                <span className="font-bold text-lg">April 2026</span>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">→</button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
                {days.map(d => (
                    <div key={d} className="text-xs font-bold text-gray-400 mb-2 uppercase">{d}</div>
                ))}
                {dates.map(date => (
                    <div 
                        key={date} 
                        onClick={() => onChange({ checkIn: '2026-04-12', checkOut: '2026-04-15' })}
                        className={`p-3 text-sm font-semibold rounded-lg cursor-pointer transition-all ${
                            date === 12 || date === 15 ? 'bg-[#008cff] text-white shadow-lg' : 
                            date > 12 && date < 15 ? 'bg-blue-50 text-[#008cff]' : 
                            'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                        {date}
                    </div>
                ))}
            </div>
            <p className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest font-black italic">Select Check-in and Check-out dates</p>
        </div>
    );
};

export default DatePicker;
