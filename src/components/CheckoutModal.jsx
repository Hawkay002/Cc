import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { TelegramIcon, UserIcon, PhoneIcon, Location01Icon } from '@hugeicons/core-free-icons';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setStatus('loading');

    const orderText = formatOrderMessage(formData, cartItems, totalPrice);

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: orderText,
          parse_mode: 'HTML',
        }),
      });

      const data = await response.json();
      if (data.ok) {
        setStatus('success');
        clearCart();
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', phone: '', address: '' });
          onClose();
        }, 3000);
      } else {
        throw new Error(data.description);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-[90] overflow-hidden"
          >
            <div className="bg-dark-800 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
              {/* Header */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                    <HugeiconsIcon icon={TelegramIcon} size={20} color="#e8b32a" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Place Order</h2>
                    <p className="text-sm text-white/40">We'll send your order via Telegram</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {status === 'success' ? (
                <div className="p-8 sm:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-2">Order Placed!</h3>
                  <p className="text-white/50">Your order has been sent successfully. We'll contact you shortly.</p>
                </div>
              ) : status === 'error' ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Something went wrong</h3>
                  <p className="text-white/50 mb-6">Please check your Telegram bot configuration.</p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary">
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                  {/* Order Summary */}
                  <div className="p-4 rounded-2xl bg-dark-700/50 border border-white/5 space-y-2">
                    <h4 className="text-sm font-semibold text-white/60 mb-3">Order Summary</h4>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-white/70">
                          {item.name} <span className="text-white/30">×{item.quantity}</span>
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-white/5 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="font-display gold-gradient-text">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
                        <HugeiconsIcon icon={UserIcon} size={16} color="currentColor" strokeWidth={1.5} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-white/20 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
                        <HugeiconsIcon icon={PhoneIcon} size={16} color="currentColor" strokeWidth={1.5} />
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-white/20 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-white/60 mb-2">
                        <HugeiconsIcon icon={Location01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                        className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white placeholder-white/20 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Order...
                      </>
                    ) : (
                      <>
                        <HugeiconsIcon icon={TelegramIcon} size={20} color="currentColor" strokeWidth={1.5} />
                        Send Order via Telegram — ${totalPrice.toFixed(2)}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function formatOrderMessage(formData, items, total) {
  const now = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let message = `<b>🍽️ NEW ORDER — Cloud Kitchen</b>\n`;
  message += `<b>📅 ${now}</b>\n\n`;
  message += `<b>👤 Customer Details</b>\n`;
  message += `Name: <b>${escapeHtml(formData.name)}</b>\n`;
  message += `Phone/WhatsApp: <b>${escapeHtml(formData.phone)}</b>\n`;
  message += `Address: <b>${escapeHtml(formData.address)}</b>\n\n`;
  message += `<b>📋 Order Items</b>\n`;

  items.forEach((item, i) => {
    message += `${i + 1}. ${escapeHtml(item.name)}\n`;
    message += `   Qty: ${item.quantity} × $${item.price} = <b>$${(item.price * item.quantity).toFixed(2)}</b>\n`;
  });

  message += `\n<b>💰 Total: $${total.toFixed(2)}</b>\n`;
  message += `\n<i>Reply to confirm this order.</i>`;

  return message;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
