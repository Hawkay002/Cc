import ScrollReveal from './ScrollReveal';
import { Award, Leaf, Clock, ShieldCheck } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { OrganicFoodIcon, DeliveredSentIcon, Award04Icon, SecuredNetworkIcon } from '@hugeicons/core-free-icons';

const features = [
  {
    icon: OrganicFoodIcon,
    lucide: Leaf,
    title: 'Farm Fresh',
    desc: 'Ingredients sourced daily from local organic farms and premium suppliers.',
  },
  {
    icon: Award04Icon,
    lucide: Award,
    title: 'Michelin Trained',
    desc: 'Our chefs trained at world-renowned restaurants before bringing their craft to you.',
  },
  {
    icon: DeliveredSentIcon,
    lucide: Clock,
    title: 'Lightning Fast',
    desc: 'Average delivery time of 25 minutes with real-time GPS tracking.',
  },
  {
    icon: SecuredNetworkIcon,
    lucide: ShieldCheck,
    title: 'HACCP Certified',
    desc: 'Highest food safety standards maintained in our state-of-the-art kitchen.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=1000&fit=crop"
                  alt="Chef preparing food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 glass-card p-4 sm:p-6 max-w-[200px]">
                <div className="font-display text-3xl sm:text-4xl font-bold gold-gradient-text">5+</div>
                <div className="text-sm text-white/60 mt-1">Years of culinary excellence</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-gold-500/20 rounded-2xl" />
            </div>
          </ScrollReveal>

          {/* Text Side */}
          <div>
            <ScrollReveal>
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
                About Us
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
                Where Passion Meets{' '}
                <span className="gold-gradient-text italic">Precision</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-white/50 leading-relaxed mb-8 text-base sm:text-lg">
                Founded by a collective of Michelin-starred chefs, Cloud Kitchen reimagines
                fine dining for the modern era. Every dish is a symphony of flavors, textures,
                and presentation — prepared in our temperature-controlled kitchen and delivered
                in premium packaging that preserves perfection.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.title} delay={0.3 + i * 0.1}>
                  <div className="group p-4 sm:p-5 rounded-2xl bg-dark-800/50 border border-white/5 hover:border-gold-500/20 transition-all duration-300 hover:bg-dark-800">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 group-hover:bg-gold-500/20 transition-colors">
                      <HugeiconsIcon icon={feature.icon} size={20} color="#e8b32a" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
