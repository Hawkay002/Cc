import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon } from '@hugeicons/core-free-icons';
import ScrollReveal from './ScrollReveal';
import MenuItemModal from './MenuItemModal';
import { categories, menuItems } from '../data/menuData';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="menu" className="py-20 sm:py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Our Menu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            Curated for <span className="gold-gradient-text italic">Excellence</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Each dish is crafted with precision using the finest ingredients available.
          </p>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1} className="mb-10 sm:mb-12">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-gold-500 text-dark-900'
                    : 'bg-dark-800 text-white/50 hover:text-white hover:bg-dark-700 border border-white/5'
                }`}
              >
                {cat.name}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gold-500 rounded-xl -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer"
              >
                <div className="glass-card overflow-hidden hover:border-gold-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/5">
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent opacity-60" />
                    
                    {/* Add Button */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gold-500 text-dark-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <Plus className="w-5 h-5" />
                    </div>

                    {/* Tags */}
                    {item.tags?.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-dark-900/80 backdrop-blur text-gold-300 text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg font-semibold group-hover:text-gold-300 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <span className="font-display text-lg font-bold gold-gradient-text flex-shrink-0">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1 text-gold-500/60">
                      <HugeiconsIcon icon={StarIcon} size={14} color="currentColor" strokeWidth={1.5} />
                      <span className="text-xs font-medium">4.8</span>
                      <span className="text-xs text-white/20 ml-1">({Math.floor(Math.random() * 200 + 50)})</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <MenuItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
