'use client';

import { useRef, ReactNode, useSyncExternalStore } from 'react';
import { Rnd, ResizableDelta, Position } from 'react-rnd';
import { X, Minus, Maximize2, Minimize2, Terminal, Folder, Braces, Mail, FileText } from 'lucide-react';
import { useWindowManager } from '@/context/WindowManagerContext';
import { WindowId } from '@/lib/types';

interface WindowProps {
  id: WindowId;
  title: string;
  children: ReactNode;
}

const windowIcons: Record<WindowId, React.ReactNode> = {
  terminal: <Terminal size={14} className="text-[#00ff41]" />,
  projects: <Folder size={14} className="text-[#00d2ff]" />,
  skills: <Braces size={14} className="text-[#ffbd2e]" />,
  contact: <Mail size={14} className="text-[#a855f7]" />,
  resume: <FileText size={14} className="text-[#ff5f56]" />,
};

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
    <Rnd
      ref={rndRef}
      position={windowState.position}
      size={windowState.size}
      minWidth={360}
      minHeight={260}
      bounds="window"
      dragHandleClassName="window-titlebar"
      cancel=".window-control-btn, input, textarea, button, a"
      disableDragging={windowState.isMaximized}
      enableResizing={!windowState.isMaximized}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={() => bringToFront(id)}
      style={{ zIndex: windowState.zIndex }}
      className="pointer-events-auto select-none"
      resizeHandleClasses={{
        bottom: 'h-2 cursor-ns-resize',
        bottomLeft: 'w-3 h-3 cursor-nesw-resize',
        bottomRight: 'w-3 h-3 cursor-nwse-resize',
        left: 'w-2 cursor-ew-resize',
        right: 'w-2 cursor-ew-resize',
        top: 'h-2 cursor-ns-resize',
        topLeft: 'w-3 h-3 cursor-nwse-resize',
        topRight: 'w-3 h-3 cursor-nesw-resize',
      }}
    >
      <div
        className={`w-full h-full flex flex-col rounded-xl overflow-hidden backdrop-blur-2xl transition-all duration-150 ${
          isActive
            ? 'shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,210,255,0.35)] bg-[#111620] border border-[#00d2ff]/40'
            : 'shadow-[0_16px_40px_rgba(0,0,0,0.6)] bg-[#111620]/90 border border-white/10'
        }`}
      >
        {/* Title Bar */}
        <div
          className={`window-titlebar h-10 flex items-center justify-between px-3 gap-3 select-none cursor-move border-b border-white/[0.08] transition-colors ${
            isActive ? 'bg-[#18202e]' : 'bg-[#131a24]'
          }`}
          onDoubleClick={() => toggleMaximizeWindow(id)}
        >
          {/* Left: Window Icon & Title */}
          <div className="flex items-center gap-2.5 min-w-0 pr-2 pointer-events-none">
            <div className="p-1 rounded bg-white/5 border border-white/10 flex-shrink-0">
              {windowIcons[id]}
            </div>
            <span className="text-xs font-mono font-medium text-[#e6edf3] truncate">
              {title}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse flex-shrink-0" />
            )}
          </div>

          {/* Right: Modern Window Controls (Minimize, Maximize/Restore, Close) */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Minimize */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
              title="Minimize"
              className="window-control-btn w-7 h-7 rounded-lg flex items-center justify-center text-[#8b949e] hover:text-[#ffbd2e] hover:bg-[#ffbd2e]/15 active:scale-95 transition-all"
              aria-label="Minimize window"
            >
              <Minus size={13} strokeWidth={2.5} />
            </button>

            {/* Maximize / Restore */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximizeWindow(id);
              }}
              title={windowState.isMaximized ? 'Restore Window' : 'Maximize Window'}
              className="window-control-btn w-7 h-7 rounded-lg flex items-center justify-center text-[#8b949e] hover:text-[#00d2ff] hover:bg-[#00d2ff]/15 active:scale-95 transition-all"
              aria-label={windowState.isMaximized ? 'Restore window' : 'Maximize window'}
            >
              {windowState.isMaximized ? (
                <Minimize2 size={13} strokeWidth={2.5} />
              ) : (
                <Maximize2 size={13} strokeWidth={2.5} />
              )}
            </button>

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              title="Close"
              className="window-control-btn w-7 h-7 rounded-lg flex items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#ff5f56] active:scale-95 transition-all"
              aria-label="Close window"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-[#0b0e14]/90 select-text">
          {children}
        </div>
      </div>
    </Rnd>
  );
}