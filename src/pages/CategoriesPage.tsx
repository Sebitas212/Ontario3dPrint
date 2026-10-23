import React from 'react';
import { ArrowRight, Monitor, Cpu, Home, Smartphone, Briefcase, Cog, Sparkles, Box } from 'lucide-react';
import { ProductCategory, Product } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoriesPageProps {
  products: Product[];
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  products,
  onSelectCategory,
}) => {
  const categoryMeta: Record<string, { icon: React.ReactNode; desc: string; image: string }> = {
    'Desk & Workspace': {
      icon: <Monitor className="w-5 h-5 text-cyan-400" />,
      desc: 'Generative monitor risers, parametric headphone stands, and acoustic sound docks.',
      image: '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
    },
    'Phone & Tech Accessories': {
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      desc: 'Helical MagSafe wireless chargers, cable clips, and precision device docks.',
      image: '/src/assets/images/product_magsafe_charging_orb_1792788605726.jpg',
    },
    'Everyday Carry': {
      icon: <Briefcase className="w-5 h-5 text-cyan-400" />,
      desc: 'Topological valet trays, bit drivers, and pocket gear organizers in PETG-CF.',
      image: '/src/assets/images/product_edc_gear_organizer_1792788606696.jpg',
    },
    'Home Organization': {
      icon: <Home className="w-5 h-5 text-cyan-400" />,
      desc: 'Modular hex self-watering planters and magnetic cable conduits.',
      image: '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
    },
    'Smart Accessories': {
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      desc: 'AeroTactile mechanical resin keycaps and modular desktop accessories.',
      image: '/src/assets/images/product_edc_gear_organizer_1792788606696.jpg',
    },
    'Custom 3D Prints': {
      icon: <Cog className="w-5 h-5 text-cyan-400" />,
      desc: 'Functional planetary gearboxes, robotics parts, and bespoke prototypes.',
      image: '/src/assets/images/showcase_custom_prototyping_1792788606505.jpg',
    },
    'Innovative Gadgets': {
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      desc: 'Parametric kinetic objects and algorithmic design wonders.',
      image: '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
    },
  };

  const categoriesList = CATEGORIES.filter((c) => c !== 'All Products') as ProductCategory[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          EXPLORE BY COLLECTION · ONTARIO3DPRINT
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Curated Product Categories
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          From functional desk ergonomics and wireless charging stands to rugged pocket EDC valets, explore precision additive designs organized by purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categoriesList.map((cat) => {
          const meta = categoryMeta[cat] || {
            icon: <Box className="w-5 h-5 text-cyan-400" />,
            desc: 'Precision 3D printed components and accessories.',
            image: '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
          };
          const count = products.filter((p) => p.category === cat).length;

          return (
            <div
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="group relative bg-[#0C0E15] border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-950/20"
            >
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={meta.image}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E15] via-[#0C0E15]/40 to-transparent" />
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800">
                  {meta.icon}
                </div>
                <div className="absolute top-4 right-4 text-xs font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                  {count} {count === 1 ? 'Design' : 'Designs'}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {cat}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {meta.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
