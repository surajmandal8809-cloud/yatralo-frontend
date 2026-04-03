import React from 'react';
import { Plus, Minus } from 'lucide-react';

const GuestSelector = ({ values, onChange, onClose }) => {
    
    const updateValue = (field, delta) => {
        const newVal = Math.max(field === 'rooms' || field === 'adults' ? 1 : 0, values[field] + delta);
        onChange({ ...values, [field]: newVal });
    };

    return (
        <div className="space-y-8 p-4">
            <h3 className="text-xl font-bold border-b pb-4 mb-6">Select Guests & Rooms</h3>
            
            <div className="space-y-6">
                <CounterRow label="Rooms" sub="Max 8 rooms per booking" value={values.rooms} onInc={() => updateValue('rooms', 1)} onDec={() => updateValue('rooms', -1)} />
                <CounterRow label="Adults" sub="12+ Years old" value={values.adults} onInc={() => updateValue('adults', 1)} onDec={() => updateValue('adults', -1)} />
                <CounterRow label="Children" sub="0-12 Years old" value={values.children} onInc={() => updateValue('children', 1)} onDec={() => updateValue('children', -1)} />
            </div>

            <div className="flex justify-between items-center bg-gray-50 -mx-6 -mb-6 p-6 mt-8 rounded-b-xl border-t border-gray-100 italic">
                <p className="text-xs text-gray-500 max-w-[140px] italic leading-tight">Total {values.adults + values.children} travelers in {values.rooms} room</p>
                <button 
                   onClick={onClose}
                   className="bg-[#008cff] text-white px-8 py-3 rounded-xl font-black uppercase text-sm shadow-xl shadow-blue-200 hover:scale-[1.05] active:scale-[0.98] transition-all"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

const CounterRow = ({ label, sub, value, onInc, onDec }) => (
    <div className="flex items-center justify-between group">
        <div>
            <p className="font-black text-gray-800 text-lg uppercase tracking-tight">{label}</p>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider transition-colors group-hover:text-blue-500">{sub}</p>
        </div>
        <div className="flex items-center gap-6 bg-white border p-1 rounded-2xl shadow-sm">
            <button onClick={onDec} className="p-3 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100">
                <Minus size={16} />
            </button>
            <span className="w-6 text-center font-black text-xl italic">{value}</span>
            <button onClick={onInc} className="p-3 bg-[#008cff11] hover:bg-[#008cff] text-[#008cff] hover:text-white rounded-xl transition-all border border-[#008cff22] hover:border-[#008cff]">
                <Plus size={16} />
            </button>
        </div>
    </div>
);

export default GuestSelector;
