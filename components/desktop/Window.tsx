'use client';

import { useRef, ReactNode, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd, ResizableDelta, Position } from 'react-rnd';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { WindowId } from '@/lib/types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: ReactNode;
}

const emptySubscribe = () => () => {};
const getClientMounted = () => true;
const getServerMounted = () => false;

export function Window({ id, title, children }: WindowProps) {
  const {
    windows,
    activeWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const windowState = windows[id];
  const rndRef = useRef<Rnd>(null);
  const mounted = useSyncExternalStore(emptySubscribe, getClientMounted, getServerMounted);

  if (!mounted || !windowState.isOpen || windowState.isMinimized) return null;

  const isActive = activeWindow === id;

  const handleDragStop = (
    _e: unknown,
    d: { x: number; y: number }
  ) => {
    updateWindowPosition(id, { x: d.x, y: d.y });
  };

  const handleResizeStop = (
    _e: MouseEvent | TouchEvent,
    _direction: string,
    ref: HTMLElement,
    _delta: ResizableDelta,
    position: Position
  ) => {
    updateWindowSize(id, {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    });
    updateWindowPosition(id, position);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      >
        <Rnd
          ref={rndRef}
          position={windowState.position}
          size={windowState.size}
          minWidth={360}
          minHeight={260}
          bounds="parent"
          disableDragging={windowState.isMaximized}
          enableResizing={!windowState.isMaximized}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          onMouseDown={() => bringToFront(id)}
          dragHandleClassName="window-titlebar"
          style={{ zIndex: windowState.zIndex }}
          className={`rounded-xl overflow-hidden backdrop-blur-xl transition-shadow duration-200 flex flex-col ${
            isActive
              ? 'shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,210,255,0.3)] bg-[#161b22]/95 border border-[#00d2ff]/30'
              : 'shadow-[0_16px_40px_rgba(0,0,0,0.6)] bg-[#161b22]/90 border border-white/[0.08]'
          }`}
        >
          {/* Title Bar */}
          <div
            className={`window-titlebar h-9 flex items-center px-3 gap-2 select-none cursor-default transition-colors ${
              isActive ? 'bg-[#1c2333]' : 'bg-[#151a26]'
            }`}
            onDoubleClick={() => toggleMaximizeWindow(id)}
          >
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                title="Close"
                className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group"
              >
                <X size={8} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                title="Minimize"
                className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors flex items-center justify-center group"
              >
                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximizeWindow(id);
                }}
                title={windowState.isMaximized ? 'Restore' : 'Maximize'}
                className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors flex items-center justify-center group"
              >
                {windowState.isMaximized ? (
                  <Minimize2 size={7} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
                ) : (
                  <Maximize2 size={7} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
                )}
              </button>
            </div>

            {/* Title */}
            <div className="flex-1 text-center text-xs font-mono text-[#8b949e] pr-14 truncate">
              {title}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto bg-[#0d1117]/80">
            {children}
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
}