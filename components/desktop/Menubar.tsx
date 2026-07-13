'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Terminal, Wifi, Battery } from 'lucide-react';

export function Menubar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-between px-4 text-xs font-mono select-none">
      <div className="flex items-center gap-2 text-[#e6edf3]">
        <Terminal size={14} className="text-[#00ff41]" />
        <span>SaurabhOS v1.0</span>
      </div>

      <div className="flex items-center gap-4 text-[#e6edf3]">
        <span>{format(time, 'EEE MMM d')}</span>
        <span className="tabular-nums">{format(time, 'HH:mm:ss')}</span>
        <Wifi size={14} className="text-[#8b949e]" />
        <div className="flex items-center gap-1">
          <Battery size={14} className="text-[#8b949e]" />
          <span className="text-[10px]">100%</span>
        </div>
      </div>
    </div>
  );
}
