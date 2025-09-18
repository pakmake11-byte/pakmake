'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavigationItem } from '@/types/NavigationItem';

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

const iconComponents = {
  Calculator,
};

export default function Navigation({ items, className }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'flex items-center',
        className
      )}
    >
      <ul className="flex items-center space-x-1">
        {items.map((item, index) => {
          const IconComponent =
            item.icon ? iconComponents[item.icon as keyof typeof iconComponents] : null;
          const active = isActive(item.href);

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  'relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2',
                  'text-white/90 hover:text-white hover:bg-white/10',
                  active && 'text-white bg-white/20',
                  item.id === 'calculator' && 'font-semibold'
                )}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span>{item.label}</span>

                {active && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-6 h-0.5 rounded-full bg-white"
                    layoutId="nav-indicator-light"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ x: '-50%' }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
