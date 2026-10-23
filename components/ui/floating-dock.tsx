'use client';

import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';

import { FaCompass, FaTimes } from 'react-icons/fa';

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  color?: string;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('fixed bottom-5 right-5 z-50 block md:hidden pointer-events-auto', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="mobile-dock-stack"
            className="absolute bottom-full mb-3 right-0 flex flex-col gap-2.5 items-end"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: (items.length - 1 - idx) * 0.04,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.85,
                  transition: {
                    delay: idx * 0.03,
                  },
                }}
                className="flex items-center gap-2.5 select-none"
              >
                {/* Floating Tooltip Pill */}
                <div className="px-3 py-1 rounded-xl bg-black/90 border border-white/20 text-white font-mono text-[11px] font-semibold shadow-2xl backdrop-blur-xl whitespace-nowrap">
                  {item.title}
                </div>

                {/* Circular Icon Button */}
                <button
                  type="button"
                  aria-label={item.title}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={cn(
                    'h-12 w-12 rounded-full flex items-center justify-center relative transition-all duration-200 shadow-xl backdrop-blur-xl shrink-0 cursor-pointer',
                    item.isActive
                      ? 'bg-white/20 border-2 shadow-[0_0_20px_rgba(145,93,255,0.4)]'
                      : 'bg-black/90 border border-white/20 hover:bg-white/10'
                  )}
                  style={{
                    borderColor: item.isActive ? item.color : undefined,
                    boxShadow: item.isActive ? `0 0 18px ${item.color}77` : undefined,
                  }}
                >
                  <div
                    style={{ color: item.isActive ? item.color : '#cbd5e1' }}
                    className="text-base flex items-center justify-center"
                  >
                    {item.icon}
                  </div>

                  {/* Active Indicator dot */}
                  {item.isActive && (
                    <span
                      className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 6px ${item.color}`,
                      }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button & Indicator on Lower Right */}
      <div className="flex items-center gap-2.5">
        {/* Animated 'Menu ➔' Indicator Pill */}
        <AnimatePresence>
          {!open && (
            <motion.button
              type="button"
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/90 border border-[#915DFF]/50 text-white font-mono text-[11px] shadow-[0_0_20px_rgba(145,93,255,0.4)] backdrop-blur-xl cursor-pointer select-none active:scale-95 transition-transform"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#915DFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#915DFF]" />
              </span>
              <span className="font-semibold tracking-wider uppercase text-[10.5px] text-slate-100">
                Menu
              </span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="text-[#915DFF] text-xs font-bold leading-none"
              >
                ➔
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Circular Floating Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          type="button"
          aria-label="Toggle Spatial Navigation Menu"
          className="relative h-14 w-14 rounded-full bg-black/90 border-2 border-[#915DFF]/60 flex items-center justify-center text-white shadow-[0_0_30px_rgba(145,93,255,0.45)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          {/* Subtle radar beacon pulse when closed */}
          {!open && (
            <span className="absolute -inset-1 rounded-full bg-[#915DFF]/30 animate-ping pointer-events-none" />
          )}

          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center text-xl text-[#915DFF]"
          >
            {open ? <FaTimes className="text-white" /> : <FaCompass />}
          </motion.div>
        </button>
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'hidden md:flex mx-auto h-16 sm:h-20 gap-2 sm:gap-3 items-end rounded-2xl sm:rounded-3xl bg-black/80 border border-white/20 px-3 sm:px-4 pb-2.5 sm:pb-3 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(145,93,255,0.25)] backdrop-blur-2xl max-w-full overflow-x-auto no-scrollbar',
        className
      )}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  onClick,
  isActive = false,
  color = '#915DFF',
}: FloatingDockItem & { mouseX: MotionValue }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 64, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 64, 42]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [18, 28, 18]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [18, 28, 18]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 160,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={title}
      className="cursor-pointer shrink-0 relative flex flex-col items-center group select-none bg-transparent border-0 p-0 focus:outline-none"
    >
      <motion.div
        ref={ref}
        style={{
          width,
          height,
          borderColor: isActive ? color : undefined,
          boxShadow: isActive ? `0 0 20px ${color}66` : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.92 }}
        className={cn(
          'aspect-square rounded-full flex items-center justify-center relative transition-all duration-200',
          isActive
            ? 'bg-white/15 border-2 shadow-lg'
            : 'bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/40'
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 2, x: '-50%' }}
              className="px-2.5 py-1 whitespace-pre rounded-lg bg-black/90 border border-white/20 text-white font-mono text-[11px] font-semibold absolute -top-10 left-1/2 -translate-x-1/2 w-fit shadow-2xl backdrop-blur-md pointer-events-none z-50 flex items-center gap-1.5"
            >
              <span>{title}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
            color: isActive ? color : '#cbd5e1',
          }}
          className="flex items-center justify-center transition-colors duration-200"
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Signature MacOS / Spatial Active Dot underneath the icon */}
      <div className="h-1.5 flex items-center justify-center mt-1">
        {isActive && (
          <motion.div
            layoutId="activeDockDot"
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          />
        )}
      </div>
    </button>
  );
}

