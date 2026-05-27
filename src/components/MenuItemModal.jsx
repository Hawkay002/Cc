import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Clock, Flame } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons';
import { useCart } from '../context/CartContext';

export default function MenuItemModal({ item, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!item) return null;

  const handleAdd = () => {
    addToCart(item, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-[70] overflow-hidden"
          >
            <div className="bg-dark-800 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
              {/* Image */}
              <div className="relative h-56 sm:h-64">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/20 to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                {item.tags?.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">{item.name}</h3>
                  <span className="font-display text-2xl font-bold gold-gradient-text">${item.price}</span>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">{item.description}</p>

                <div className="flex items-center gap-6 mb-8 text-sm text-white/40">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    <span>{item.calories}</span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-8 p-4 rounded-2xl bg-dark-700/50 border border-white/5">
                  <span className="text-sm font-medium text-white/60">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-xl bg-dark-600 flex items-center justify-center text-white hover:bg-dark-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-display text-xl font-bold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-xl bg-dark-600 flex items-center justify-center text-white hover:bg-dark-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add Button */}
                <button
                  onClick={handleAdd}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4"
                >
                  <HugeiconsIcon icon={ShoppingBasket01Icon} size={20} color="currentColor" strokeWidth={1.5} />
                  Add to Cart — ${(item.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
