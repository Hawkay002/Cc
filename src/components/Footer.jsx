import { ChefHat, Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { TelegramIcon, WhatsappIcon } from '@hugeicons/core-free-icons';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-dark-900" />
              </div>
              <span className="font-display text-xl font-bold">
                Cloud<span className="gold-gradient-text">Kitchen</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Premium cloud kitchen delivering Michelin-quality meals to your doorstep. 
              Every dish tells a story of passion and precision.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 hover:border-gold-500/20 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/80">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Our Menu', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-white/40 hover:text-gold-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white/80">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-gold-500/60 flex-shrink-0" />
                123 Gourmet Lane, NYC
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40">
                <Phone className="w-4 h-4 text-gold-500/60 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40">
                <Mail className="w-4 h-4 text-gold-500/60 flex-shrink-0" />
                hello@cloudkitchen.com
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-white/80">Opening Hours</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-white/60">11AM - 11PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white/60">10AM - 12AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white/60">10AM - 10PM</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/10 text-gold-400 text-sm hover:bg-gold-500/20 transition-colors"
              >
                <HugeiconsIcon icon={TelegramIcon} size={16} color="currentColor" strokeWidth={1.5} />
                Telegram
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={16} color="currentColor" strokeWidth={1.5} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © 2026 Cloud Kitchen. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/20">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
