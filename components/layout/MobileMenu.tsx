'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavigationItem } from '@/types/NavigationItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}

const iconComponents = {
  Calculator,
};

const quickActions = [
  {
    id: 'calculator',
    label: 'Calculate Savings',
    href: '/calculator',
    icon: Calculator,
    variant: 'outline' as const,
  },
  {
    id: 'quote',
    label: 'Get Quote',
    href: '/contact',
    icon: Phone,
    variant: 'primary' as const,
  },
];

const contactInfo = [
  {
    icon: Phone,
    label: '+91-98291-87167',
    href: 'tel:+919829187167',
  },
  {
    icon: Mail,
    label: 'sandeepjajoo@yahoo.com',
    href: 'mailto:sandeepjajoo@yahoo.com',
  },
  {
    icon: MapPin,
    label: 'Jaipur, Rajasthan',
    href: '/contact#locations',
  },
];

export default function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    onClose();
  };

  const menuVariants = {
    closed: {
      x: '100vw',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: '0',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <motion.div
              className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-white">
                PakMaker Packaging Inc<span className="text-primary-200">®</span>
              </h2>
              <p className="text-sm text-primary-100 mt-1">
                Move More Products More Economically
              </p>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex-1 py-6 overflow-y-auto">
              <nav className="px-6">
                <ul className="space-y-2">
                  {items.map((item, index) => {
                    const IconComponent = item.icon ? iconComponents[item.icon as keyof typeof iconComponents] : null;
                    const active = isActive(item.href);

                    return (
                      <motion.li
                        key={item.id}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className={cn(
                            'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                            active && 'bg-primary-50 text-primary-700 border border-primary-200',
                            item.id === 'calculator' && 'font-medium'
                          )}
                        >
                          {IconComponent && (
                            <IconComponent 
                              className={cn(
                                'w-5 h-5 flex-shrink-0',
                                active ? 'text-primary-600' : 'text-gray-500'
                              )}
                            />
                          )}
                          <span className="font-medium">{item.label}</span>
                          
                          {/* Active indicator */}
                          {active && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                              layoutId="mobile-nav-indicator"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Quick Actions */}
              <motion.div
                className="px-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Link
                      key={action.id}
                      href={action.href}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200',
                        action.variant === 'primary'
                          ? 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700'
                          : 'border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                      )}
                    >
                      <action.icon className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium text-center">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Stats Preview */}
              <motion.div
                className="px-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-gradient-to-r from-success-50 to-primary-50 rounded-xl p-4 border border-success-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Why Choose PakMaker?</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary-600">80%</div>
                      <div className="text-xs text-gray-600">Cost Reduction</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-success-600">12%</div>
                      <div className="text-xs text-gray-600">More Capacity</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent-600">100%</div>
                      <div className="text-xs text-gray-600">Sustainable</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="p-6 border-t border-gray-200 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Get in Touch</h3>
              <div className="space-y-3">
                {contactInfo.map((contact) => (
                  <Link
                    key={contact.href}
                    href={contact.href}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <contact.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{contact.label}</span>
                  </Link>
                ))}
              </div>
              
              {/* Certifications */}
              <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">
                  <div className="font-medium">Certified by</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span>ISO</span>
                    <span>•</span>
                    <span>Sedex</span>
                    <span>•</span>
                    <span>SFI®</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}