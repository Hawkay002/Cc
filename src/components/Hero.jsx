import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { DeliveryBox01Icon } from '@hugeicons/core-free-icons';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/95 to-dark-900 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/20 via-dark-900 to-dark-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 section-padding max-w-5xl mx-auto text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Premium Cloud Kitchen Experience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 text-balance"
        >
          Gourmet Food,
          <br />
          <span className="gold-gradient-text italic">Delivered.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Chef-crafted meals prepared with premium ingredients, delivered fresh to your door.
          Experience restaurant-quality dining without leaving home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#menu" className="btn-primary flex items-center gap-2 text-base w-full sm:w-auto justify-center">
            <HugeiconsIcon icon={DeliveryBox01Icon} size={20} color="currentColor" strokeWidth={1.5} />
            Order Now
          </a>
          <a href="#about" className="btn-secondary flex items-center gap-2 text-base w-full sm:w-auto justify-center">
            Our Story
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 sm:mt-24 grid grid-cols-3 gap-6 sm:gap-12 max-w-lg mx-auto"
        >
          {[
            { value: '15K+', label: 'Orders' },
            { value: '4.9', label: 'Rating' },
            { value: '25min', label: 'Avg Delivery' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
