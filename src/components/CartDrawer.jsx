import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { EmptyBoxIcon } from '@hugeicons/core-free-icons';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-800 border-l border-white/5 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">Your Cart</h2>
                  <p className="text-sm text-white/40">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 no-scrollbar">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-dark-700 flex items-center justify-center mb-4">
                      <HugeiconsIcon icon={EmptyBoxIcon} size={40} color="#ffffff20" strokeWidth={1} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white/60 mb-2">Your cart is empty</h3>
                    <p className="text-sm text-white/30">Add some delicious items to get started!</p>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-3 rounded-2xl bg-dark-700/50 border border-white/5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate mb-1">{item.name}</h4>
                        <p className="text-gold-400 font-display font-bold text-sm mb-3">
                          ${item.price}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-dark-600 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-dark-600 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-white/5 bg-dark-800">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-white/50">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/50">
                    <span>Delivery</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/5">
                    <span>Total</span>
                    <span className="font-display gold-gradient-text">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={onCheckout}
                  className="btn-primary w-full py-4 text-base"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
