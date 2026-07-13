'use client';

import { useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { X, Minus, Square } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { WindowId } from '@/lib/types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: ReactNode;
}

export function Window({ id, title, children }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, bringToFront, updateWindowPosition, updateWindowSize } = useWindowManager();
  const windowState = windows[id];
  const rndRef = useRef<Rnd>(null);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const handleDragStop = (_e: any, d: { x: number; y: number }) => {
    updateWindowPosition(id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (_e: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number }) => {
    updateWindowSize(id, { 
      width: parseInt(ref.style.width), 
      height: parseInt(ref.style.height) 
    });
    updateWindowPosition(id, position);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Rnd
          ref={rndRef}
          default={{
            x: typeof window !== 'undefined' ? window.innerWidth / 2 - windowState.size.width / 2 : 100,
            y: typeof window !== 'undefined' ? window.innerHeight / 2 - windowState.size.height / 2 : 100,
            width: windowState.size.width,
            height: windowState.size.height,
          }}
          position={windowState.position}
          size={windowState.size}
          minWidth={400}
          minHeight={300}
          // ❌ REMOVED: bounds="parent" — was causing vertical drag issues
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          onMouseDown={() => bringToFront(id)}
          dragHandleClassName="window-titlebar"
          style={{ zIndex: windowState.zIndex }}
          // ✅ ADDED: explicit resize directions
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          // ✅ ADDED: visible resize handle styles
          resizeHandleStyles={{
            top: { cursor: 'ns-resize', height: '8px', top: '-4px' },
            right: { cursor: 'ew-resize', width: '8px', right: '-4px' },
            bottom: { cursor: 'ns-resize', height: '8px', bottom: '-4px' },
            left: { cursor: 'ew-resize', width: '8px', left: '-4px' },
            topRight: { cursor: 'nesw-resize', width: '12px', height: '12px', top: '-4px', right: '-4px' },
            bottomRight: { cursor: 'nwse-resize', width: '12px', height: '12px', bottom: '-4px', right: '-4px' },
            bottomLeft: { cursor: 'nesw-resize', width: '12px', height: '12px', bottom: '-4px', left: '-4px' },
            topLeft: { cursor: 'nwse-resize', width: '12px', height: '12px', top: '-4px', left: '-4px' },
          }}
          className="shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden border border-white/[0.08] bg-[#161b22]"
        >
          {/* Title Bar */}
          <div className="window-titlebar h-8 bg-[#1c2333] flex items-center px-3 gap-2 select-none cursor-default">
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => closeWindow(id)}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group"
              >
                <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
              </button>
              <button
                onClick={() => minimizeWindow(id)}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors flex items-center justify-center group"
              >
                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
              </button>
              <button
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors flex items-center justify-center group"
              >
                <Square size={6} className="opacity-0 group-hover:opacity-100 text-black" />
              </button>
            </div>
            
            {/* Title */}
            <div className="flex-1 text-center text-xs font-mono text-[#8b949e] pr-16">
              {title}
            </div>
          </div>
          
          {/* Content */}
          <div className="h-[calc(100%-32px)] overflow-auto">
            {children}
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
}