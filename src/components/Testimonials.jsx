import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon } from '@hugeicons/core-free-icons';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'The truffle risotto was absolutely divine. You can taste the quality in every bite. This is what cloud dining should feel like — restaurant quality at home.',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Tech Executive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'I order from Cloud Kitchen at least twice a week. The consistency is remarkable, and the packaging keeps everything perfect. The Wagyu burger is my go-to.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'Finally, a delivery service that understands presentation matters. The Basque cheesecake looked like it came from a Michelin kitchen. Absolutely stunning.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[150px]" />

      <div className="section-padding max-w-5xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
            Loved by <span className="gold-gradient-text italic">Thousands</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
              <Quote className="w-12 h-12 text-gold-500/10 absolute top-6 left-6" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <HugeiconsIcon
                        key={i}
                        icon={StarIcon}
                        size={20}
                        color="#e8b32a"
                        strokeWidth={1.5}
                        className="fill-gold-400"
                      />
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-display italic leading-relaxed mb-8 max-w-3xl mx-auto">
                    "{testimonials[current].text}"
                  </p>

                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-500/30"
                    />
                    <div>
                      <div className="font-semibold">{testimonials[current].name}</div>
                      <div className="text-sm text-white/40">{testimonials[current].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === current ? 'w-8 bg-gold-400' : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
