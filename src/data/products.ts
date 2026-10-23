import { Product, CanadianProvinceTax, ShippingRate } from '../types';

export const CANADIAN_PROVINCES: CanadianProvinceTax[] = [
  { code: 'ON', name: 'Ontario', taxName: 'HST', rate: 0.13 },
  { code: 'QC', name: 'Quebec', taxName: 'GST+QST', rate: 0.14975 },
  { code: 'BC', name: 'British Columbia', taxName: 'GST+PST', rate: 0.12 },
  { code: 'AB', name: 'Alberta', taxName: 'GST', rate: 0.05 },
  { code: 'MB', name: 'Manitoba', taxName: 'GST+PST', rate: 0.12 },
  { code: 'SK', name: 'Saskatchewan', taxName: 'GST+PST', rate: 0.11 },
  { code: 'NS', name: 'Nova Scotia', taxName: 'HST', rate: 0.15 },
  { code: 'NB', name: 'New Brunswick', taxName: 'HST', rate: 0.15 },
  { code: 'NL', name: 'Newfoundland and Labrador', taxName: 'HST', rate: 0.15 },
  { code: 'PE', name: 'Prince Edward Island', taxName: 'HST', rate: 0.15 },
  { code: 'NT', name: 'Northwest Territories', taxName: 'GST', rate: 0.05 },
  { code: 'YT', name: 'Yukon', taxName: 'GST', rate: 0.05 },
  { code: 'NU', name: 'Nunavut', taxName: 'GST', rate: 0.05 },
];

export const SHIPPING_RATES: ShippingRate[] = [
  {
    id: 'standard-cp',
    name: 'Canada Post Expedited Parcel',
    description: 'Tracked ground shipping across all Canadian provinces',
    carrier: 'Canada Post',
    costCAD: 12.00,
    estimatedDays: '3–5 business days',
  },
  {
    id: 'express-cp',
    name: 'Xpresspost Priority Express',
    description: 'Guaranteed rapid air delivery with doorstep signature',
    carrier: 'Canada Post',
    costCAD: 22.00,
    estimatedDays: '1–2 business days',
  },
  {
    id: 'local-ontario',
    name: 'Ontario Metro Same-Day / Next-Day',
    description: 'Direct courier delivery for GTA & Southern Ontario addresses',
    carrier: 'Ontario Express Logistics',
    costCAD: 9.50,
    estimatedDays: 'Next business day',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'vortex-apex-headphone-stand',
    slug: 'vortex-apex-headphone-stand',
    name: 'Vortex Apex Parametric Headphone Stand',
    tagline: 'Voronoi generative lattice with integrated acoustic diffuser curve',
    category: 'Desk & Workspace',
    priceCAD: 68.00,
    compareAtPriceCAD: 85.00,
    image: '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
    gallery: [
      '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
      '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
      '/src/assets/images/product_magsafe_charging_orb_1792788605726.jpg',
    ],
    description: 'Engineered using generative Voronoi algorithms to maximize structural rigidity while reducing mass by 42%. Features an organic acoustic cradle curve to protect headphone headband cushions.',
    fullDescription: [
      'The Vortex Apex is the hallmark of Ontario3Dprint engineering. Designed with generative algorithms inspired by cellular bone microstructure, it distributes mechanical load evenly while remaining remarkably lightweight.',
      'Printed with a continuous 0.12mm precision layer resolution on high-speed industrial kinematics, the surface features a micro-tactile matte carbon texture that resists fingerprints and reflections.',
      'The sculpted apex matches the curvature of audiophile headphones from Sennheiser, Focal, Audeze, and Sony, preventing headband indentations or headband foam degradation over time.',
      'Includes concealed internal wire-routing anchors and precision non-marking silicone feet for stability on wood, slate, and glass desk surfaces.'
    ],
    colors: [
      { name: 'Stealth Carbon Black', hex: '#111318', finish: 'Matte' },
      { name: 'Cyber Electric Cyan', hex: '#00D8F6', finish: 'Satin' },
      { name: 'Industrial Graphite', hex: '#374151', finish: 'Matte' },
      { name: 'High-Temp Signal Orange', hex: '#F97316', finish: 'Matte' },
      { name: 'Glacier Titanium White', hex: '#E5E7EB', finish: 'Satin' },
    ],
    materials: [
      { id: 'petg-cf', name: 'PETG-CF (Carbon Fiber Reinforced)', description: 'Extreme stiffness, heat resistant to 75°C, matte stealth aesthetic', priceModifierCAD: 8.00, badge: 'Popular' },
      { id: 'matte-pla-pro', name: 'Matte PLA Pro Polymer', description: 'Zero sheen, high detail, bio-sourced polymer engineered in Ontario', priceModifierCAD: 0.00 },
      { id: 'tough-resin', name: 'UV Tough Engineering Resin', description: 'Glass-smooth microscopic finish, 0.05mm layer precision', priceModifierCAD: 14.00 },
    ],
    dimensions: {
      lengthMm: 142,
      widthMm: 118,
      heightMm: 275,
      display: '142 × 118 × 275 mm',
    },
    weightGrams: 285,
    layerHeight: '0.12mm Ultra-Fine',
    infillDensity: '28% Gyroid Structural',
    printDurationHours: 13.5,
    inStock: true,
    leadTimeDays: 2,
    rating: 4.9,
    reviewCount: 38,
    features: [
      'Generative Voronoi lattice minimizes mass while eliminating flex',
      'Continuous ergonomic cradle geometry preserves leather & memory foam headbands',
      'Dual rear channels for routing audiophile braided cables',
      'Weighted base with recessed silicone footpads',
      '100% additive manufactured in Ontario, Canada'
    ],
    technicalSpecs: {
      'Print Technology': 'FFF High-Speed Dual-Extrusion / SLA Available',
      'Layer Resolution': '120 Microns (0.12mm)',
      'Nozzle Diameter': '0.4mm Hardened Tool Steel',
      'Tensile Strength': '62 MPa (PETG-CF)',
      'Heat Deflection': '78°C @ 0.45 MPa',
      'Origin': 'Ontario Additive Lab, Canada'
    },
    isHeroFeatured: true,
  },
  {
    id: 'aerorise-studio-sound-dock',
    slug: 'aerorise-studio-sound-dock',
    name: 'Aerorise Studio Sound Riser & Acoustic Dock',
    tagline: 'Precision desk monitor bridge with aerodynamic acoustic chamber',
    category: 'Desk & Workspace',
    priceCAD: 84.00,
    compareAtPriceCAD: 98.00,
    image: '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
    gallery: [
      '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
      '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
    ],
    description: 'Heavy-duty monitor elevator engineered with internal acoustic channeling that enhances low-frequency response for desktop nearfield speakers while elevating displays to neutral ergonomic posture.',
    fullDescription: [
      'The Aerorise transforms your studio workflow. Constructed from carbon-reinforced structural polymer, it supports up to 32kg of ultrawide monitors without deflection.',
      'Side and front aerodynamic air-louvers act as tuned acoustic baffles, directing airflow and dissipating heat from audio interfaces, laptop docks, and converters positioned beneath.',
      'Features integrated front knurled volume potentiometer channel and dual front USB-C cable pass-throughs for seamless desktop connectivity.'
    ],
    colors: [
      { name: 'Stealth Carbon Black', hex: '#111318', finish: 'Matte' },
      { name: 'Industrial Graphite', hex: '#374151', finish: 'Matte' },
      { name: 'Titanium White', hex: '#E5E7EB', finish: 'Satin' },
    ],
    materials: [
      { id: 'petg-cf', name: 'PETG-CF Structural Core', description: 'Rated for monitors up to 49" ultrawide (32kg static load)', priceModifierCAD: 12.00, badge: 'Recommended' },
      { id: 'matte-pla-pro', name: 'Matte PLA Pro Polymer', description: 'Rated for standard monitors up to 27" (16kg load)', priceModifierCAD: 0.00 },
    ],
    dimensions: {
      lengthMm: 460,
      widthMm: 220,
      heightMm: 110,
      display: '460 × 220 × 110 mm',
    },
    weightGrams: 890,
    layerHeight: '0.16mm Precision',
    infillDensity: '35% Cubic Honeycomb',
    printDurationHours: 19.0,
    inStock: true,
    leadTimeDays: 3,
    rating: 4.8,
    reviewCount: 24,
    features: [
      'Supports ultrawide displays up to 32kg with zero sagging',
      'Dual acoustic chamber design reduces desk resonance by 18%',
      'Integrated under-shelf bay fits 14" to 16" laptops or audio DACs',
      'Chamfered rear cable harness guides cables clean and hidden'
    ],
    technicalSpecs: {
      'Print Technology': 'Large-Format Industrial CoreXY FFF',
      'Layer Resolution': '160 Microns (0.16mm)',
      'Load Capacity': '32 kg (PETG-CF) / 16 kg (PLA Pro)',
      'Infill Geometry': 'Cubic Honeycomb 35%',
      'Origin': 'Ontario, Canada'
    },
    isHeroFeatured: true,
  },
  {
    id: 'helios-magsafe-charging-orb',
    slug: 'helios-magsafe-charging-orb',
    name: 'Helios MagSafe Kinetic Charging Orb',
    tagline: 'Parametric helical cooling fins with weighted titanium-alloy base',
    category: 'Phone & Tech Accessories',
    priceCAD: 54.00,
    compareAtPriceCAD: 65.00,
    image: '/src/assets/images/product_magsafe_charging_orb_1792788605726.jpg',
    gallery: [
      '/src/assets/images/product_magsafe_charging_orb_1792788605726.jpg',
      '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
    ],
    description: 'A striking kinetic sculpture for your iPhone. Inspired by jet turbine compression fins, the helical geometry channels ambient thermal currents away from the wireless inductive coil for sustained peak charging speeds.',
    fullDescription: [
      'Fast MagSafe wireless charging generates heat that throttles iPhone charging wattage. The Helios addresses this with 24 continuous parametric air-fin blades that maximize surface-area thermal dissipation.',
      'The base incorporates an internal cavity filled with high-density ballast and a knurled titanium-aluminum retention rim, allowing you to lift your phone one-handed without the stand sliding or tipping.',
      'Compatible with original Apple MagSafe pucks, Qi2 chargers, and third-party wireless magnetic discs.'
    ],
    colors: [
      { name: 'Stealth Carbon Black', hex: '#111318', finish: 'Matte' },
      { name: 'Industrial Graphite', hex: '#374151', finish: 'Matte' },
      { name: 'Cyber Electric Cyan', hex: '#00D8F6', finish: 'Satin' },
      { name: 'Signal Orange', hex: '#F97316', finish: 'Matte' },
    ],
    materials: [
      { id: 'matte-pla-pro', name: 'Matte PLA Pro + Metal Ballast Base', description: 'Weighted anti-tip base with seamless finish', priceModifierCAD: 0.00 },
      { id: 'petg-cf', name: 'PETG-CF Thermal Core', description: 'Superior dimensional stability and thermal resistance', priceModifierCAD: 6.00, badge: 'Coolest Running' },
    ],
    dimensions: {
      lengthMm: 95,
      widthMm: 95,
      heightMm: 135,
      display: '95 × 95 × 135 mm',
    },
    weightGrams: 340,
    layerHeight: '0.12mm Ultra-Fine',
    infillDensity: '30% Gyroid',
    printDurationHours: 8.5,
    inStock: true,
    leadTimeDays: 1,
    rating: 5.0,
    reviewCount: 42,
    features: [
      'Helical convective geometry drops coil temperatures by up to 4.2°C',
      'True one-handed lift-off weighted base with micro-suction perimeter',
      'Precision 60-degree viewing angle optimized for StandBy Mode & FaceTime',
      'Concealed cable channel snaps the braided power wire cleanly into the rear'
    ],
    technicalSpecs: {
      'Viewing Angle': '60° Ergonomic Incline',
      'Thermal Efficiency': '18% faster heat transfer vs solid pucks',
      'Ballast Weight': '220g Internal Stabilizer',
      'Compatibility': 'iPhone 12 through 16 series & Qi2 magnetic phones'
    },
    isHeroFeatured: true,
  },
  {
    id: 'gridlock-edc-pocket-vault',
    slug: 'gridlock-edc-pocket-vault',
    name: 'GridLock EDC Pocket Vault & Modular Tray',
    tagline: 'Topological honeycomb infill with dual-density shock absorption',
    category: 'Everyday Carry',
    priceCAD: 42.00,
    compareAtPriceCAD: 50.00,
    image: '/src/assets/images/product_edc_gear_organizer_1792788606696.jpg',
    gallery: [
      '/src/assets/images/product_edc_gear_organizer_1792788606696.jpg',
      '/src/assets/images/showcase_custom_prototyping_1792788606505.jpg',
    ],
    description: 'Precision engineered bedside and desk valet tray for folding knives, flashlights, tactical pens, keychains, and driver bits. Features open topological honeycomb pockets and an energy-absorbing flexible insert.',
    fullDescription: [
      'Tired of your everyday pocket carry scratching wooden dressers or sliding around drawers? The GridLock provides dedicated, precision-contoured slots engineered to secure high-value EDC items.',
      'Manufactured with a rigid carbon-fiber composite perimeter frame and a co-printed high-visibility signal orange TPU 95A elastomer bed that cushions blades and titanium tools against dings.',
      'Features integrated hex-driver bit storage docks (standard 1/4" bits) and deep valet bays for watches, wallets, and pocket tools.'
    ],
    colors: [
      { name: 'Stealth Black / Signal Orange', hex: '#F97316', finish: 'Textured' },
      { name: 'Stealth Black / Cyber Cyan', hex: '#00D8F6', finish: 'Textured' },
      { name: 'Full Graphite Stealth', hex: '#1F2937', finish: 'Matte' },
    ],
    materials: [
      { id: 'dual-tpu-petgcf', name: 'Dual Composite (PETG-CF + TPU Core)', description: 'Rigid structural shell with silent soft shock liner', priceModifierCAD: 0.00, badge: 'Standard' },
    ],
    dimensions: {
      lengthMm: 195,
      widthMm: 155,
      heightMm: 32,
      display: '195 × 155 × 32 mm',
    },
    weightGrams: 260,
    layerHeight: '0.16mm Precision',
    infillDensity: '40% Honeycomb Open-Lattice',
    printDurationHours: 7.2,
    inStock: true,
    leadTimeDays: 2,
    rating: 4.9,
    reviewCount: 31,
    features: [
      'Dual-material construction prevents knife blade clatter and scratches',
      'Direct-fit docks for up to two folding knives, EDC flashlight, and pen',
      '4 × 1/4" hex bit retention slots with friction fit detents',
      'Modular perimeter dovetails allow connecting companion trays side-by-side'
    ],
    technicalSpecs: {
      'Materials': 'PETG Carbon Fiber Composite + 95A Polyurethane',
      'Hardness': 'Shore 95A (Inner Tray) / 80D (Outer Shell)',
      'Resistance': 'Oils, solvents, water, and UV radiation'
    },
    isHeroFeatured: true,
  },
  {
    id: 'hyperdrive-planetary-gearbox',
    slug: 'hyperdrive-planetary-gearbox',
    name: 'HyperDrive Compound Planetary Reducer',
    tagline: 'High-torque 4:1 mechanical gear transmission in PETG-CF composite',
    category: 'Custom 3D Prints',
    priceCAD: 125.00,
    compareAtPriceCAD: 145.00,
    image: '/src/assets/images/showcase_custom_prototyping_1792788606505.jpg',
    gallery: [
      '/src/assets/images/showcase_custom_prototyping_1792788606505.jpg',
      '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
    ],
    description: 'Fully functioning, mechanical engineering marvel designed for robotics, robotics competitions, mechanical demonstrations, and tactile desk interactions. Features helical teeth profile for silent, backlash-free operation.',
    fullDescription: [
      'A masterclass in additive manufacturing precision. The HyperDrive demonstrates what true tight-tolerance engineering 3D printing can achieve.',
      'Contains 1 ring gear, 3 helical planet gears, 1 sun gear, and a carrier plate, printed with 0.12mm layers to achieve involute tooth tooth profiles with ±0.04mm clearance tolerances.',
      'Pre-assembled with Japanese miniature 608RS sealed ball bearings and Grade 10.9 hex fasteners. Can be hand-turned for mesmerizing kinetic stress relief or driven by a NEMA 17 stepper motor.'
    ],
    colors: [
      { name: 'Industrial Carbon Black', hex: '#111318', finish: 'Textured' },
      { name: 'Graphite & Polished Steel', hex: '#4B5563', finish: 'Satin' },
    ],
    materials: [
      { id: 'petg-cf-gears', name: 'Nylon/PETG Carbon Fiber Gears', description: 'Self-lubricating, wear-resistant, high tensile strength', priceModifierCAD: 0.00, badge: 'Industrial Grade' },
    ],
    dimensions: {
      lengthMm: 160,
      widthMm: 145,
      heightMm: 78,
      display: '160 × 145 × 78 mm',
    },
    weightGrams: 510,
    layerHeight: '0.12mm Ultra-Fine',
    infillDensity: '65% High-Stress Solid',
    printDurationHours: 21.0,
    inStock: true,
    leadTimeDays: 4,
    rating: 5.0,
    reviewCount: 19,
    features: [
      'Precision 4:1 reduction ratio with helical involute tooth profile',
      'Dual sealed ball bearings for silky friction-free rotation',
      'Tactile knurled input drive shaft compatible with standard 8mm couplers',
      'Machined aluminum serialization badge engraved with serial number'
    ],
    technicalSpecs: {
      'Gear Ratio': '4:1 Reduction',
      'Backlash': '< 0.18 degrees',
      'Bearing Spec': 'ABEC-7 Dual 608RS Miniature Bearings',
      'Torque Limit': '8.5 Nm continuous operating torque'
    },
    isHeroFeatured: true,
  },
  {
    id: 'cybergrid-magnetic-cable-conduit',
    slug: 'cybergrid-magnetic-cable-conduit',
    name: 'CyberGrid Snap-Lock Cable Guides (6-Pack)',
    tagline: 'Parametric magnetic desk-edge cable organizers with zero-slip silicon',
    category: 'Home Organization',
    priceCAD: 28.00,
    compareAtPriceCAD: 34.00,
    image: '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
    gallery: [
      '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
      '/src/assets/images/product_magsafe_charging_orb_1792788605726.jpg',
    ],
    description: 'Keep USB-C, Thunderbolt, audio, and monitor cables locked at the perimeter of your work surface. Uses embedded N52 neodymium rare-earth magnets to snap cables effortlessly in place.',
    fullDescription: [
      'Stop crawling under your desk for dropped cables. The CyberGrid system attaches to any table edge with 3M removable micro-suction pads.',
      'Each guide features a spring-tensioned flexure gate that accommodates cable diameters from 2.8mm (thin charging cables) to 8.2mm (braided HDMI/power cords).',
      'Sold in a complete 6-pack with 3 dual-slot guides and 3 single-slot anchor clips.'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111318', finish: 'Matte' },
      { name: 'Industrial Slate', hex: '#374151', finish: 'Matte' },
      { name: 'Pure White', hex: '#F3F4F6', finish: 'Matte' },
      { name: 'Signal Orange', hex: '#F97316', finish: 'Matte' },
    ],
    materials: [
      { id: 'matte-pla-pro', name: 'Matte PLA Pro with N52 Magnets', description: 'Includes 6 high-power embedded neodymium cores', priceModifierCAD: 0.00 },
    ],
    dimensions: {
      lengthMm: 34,
      widthMm: 24,
      heightMm: 18,
      display: '34 × 24 × 18 mm (each)',
    },
    weightGrams: 85,
    layerHeight: '0.16mm Precision',
    infillDensity: '30% Gyroid',
    printDurationHours: 3.5,
    inStock: true,
    leadTimeDays: 1,
    rating: 4.7,
    reviewCount: 56,
    features: [
      'Snap-lock magnetic collar opens with gentle thumb pressure',
      'Compatible with cords 2.8mm to 8.2mm thick',
      'Removable micro-suction mounting tape leaves zero residue on desks',
      'Pack includes 6 modular units'
    ],
    technicalSpecs: {
      'Magnets': 'Embedded N52 Nickel-Coated Neodymium',
      'Adhesive': 'Reusable Nano-Suction Washable Film',
      'Quantity': '6 Units Per Kit'
    },
    isHeroFeatured: false,
  },
  {
    id: 'spectra-hex-modular-planter',
    slug: 'spectra-hex-modular-planter',
    name: 'Spectra Modular Geometric Hex Planter',
    tagline: 'Self-watering dual-chamber architecture with hidden reservoir',
    category: 'Home Organization',
    priceCAD: 38.00,
    compareAtPriceCAD: 45.00,
    image: '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
    gallery: [
      '/src/assets/images/hero_3d_product_cinematic_1792788604738.jpg',
      '/src/assets/images/product_desk_lattice_stand_1792788605264.jpg',
    ],
    description: 'A contemporary hexagonal planter featuring an internal wicking water reservoir. Keeps succulents and desktop plants hydrated for up to 3 weeks while maintaining a clean aesthetic.',
    fullDescription: [
      'The Spectra Planter combines modern industrial geometry with botanical science. The inner aerated root basket suspends above an internal 180ml water reservoir.',
      'Hydrophobic outer walls are treated with food-grade water sealant to ensure 100% leak-proof reliability on expensive electronics and wooden desks.',
      'Magnetic corner facets allow you to snap multiple planters together to create custom living geometric desk centerpieces.'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111318', finish: 'Matte' },
      { name: 'Basalt Dark Gray', hex: '#374151', finish: 'Matte' },
      { name: 'Titanium White', hex: '#F9FAFB', finish: 'Matte' },
      { name: 'Cyber Electric Cyan', hex: '#00D8F6', finish: 'Satin' },
    ],
    materials: [
      { id: 'matte-pla-pro', name: 'Water-Sealed Bio-PLA', description: 'Watertight multi-perimeter fused construction', priceModifierCAD: 0.00 },
      { id: 'petg-cf', name: 'Carbon Fiber Reinforced Composite', description: 'Superior weather and sunlight resistance', priceModifierCAD: 8.00 },
    ],
    dimensions: {
      lengthMm: 110,
      widthMm: 125,
      heightMm: 95,
      display: '110 × 125 × 95 mm',
    },
    weightGrams: 210,
    layerHeight: '0.16mm Precision',
    infillDensity: '25% Gyroid',
    printDurationHours: 5.8,
    inStock: true,
    leadTimeDays: 2,
    rating: 4.8,
    reviewCount: 17,
    features: [
      'Self-watering sub-irrigation capillary wicking system',
      '100% leakproof sealed dual-wall construction',
      'Magnetic side docking to create hexagonal cluster gardens',
      'Discrete water level indicator float'
    ],
    technicalSpecs: {
      'Water Reservoir': '180 ml capacity (14–21 day watering cycle)',
      'Root Basket': 'Removable inner pod with soil aeration slits',
      'Magnets': 'Quad magnetic corner coupling'
    },
    isHeroFeatured: false,
  },
  {
    id: 'artisan-keycap-carbon-edition',
    slug: 'artisan-keycap-carbon-edition',
    name: 'AeroTactile Mechanical Keycap Set (ANSI 87-Key)',
    tagline: 'High-definition resin MX-stem keycaps with micro-stippled grip',
    category: 'Smart Accessories',
    priceCAD: 72.00,
    compareAtPriceCAD: 88.00,
    image: '/src/assets/images/product_edc_gear_organizer_1792788606696.jpg',
    gallery: [
      '/src/assets/images/product_edc_gear_organizer_1792788606696.jpg',
      '/src/assets/images/showcase_custom_prototyping_1792788606505.jpg',
    ],
    description: 'Sculpted Cherry-profile replacement keycaps featuring aerodynamic top micro-ridges. Additive manufactured with 50-micron resin stereolithography for unmatched acoustic sound dampening.',
    fullDescription: [
      'Designed for mechanical keyboard enthusiasts seeking a distinct tactile feel and signature acoustic deep "thock" sound profile.',
      'Unlike injection-molded thin ABS keycaps, these 3D-printed keycaps feature 1.8mm extra-thick sidewalls that absorb high-frequency click resonance.',
      'Engineered with reinforced cross-stem cruciforms that fit all standard Cherry MX, Gateron, Kailh, and tactile mechanical switches.'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111318', finish: 'Textured' },
      { name: 'Cyan Accent Spacebar Kit', hex: '#00D8F6', finish: 'Satin' },
      { name: 'Signal Orange Key Combo', hex: '#F97316', finish: 'Textured' },
    ],
    materials: [
      { id: 'tough-resin', name: 'High-Impact UV Engineering Resin', description: 'Glass-smooth 0.05mm layer height with crisp legends', priceModifierCAD: 0.00 },
    ],
    dimensions: {
      lengthMm: 18,
      widthMm: 18,
      heightMm: 11,
      display: 'Standard Cherry Profile (18 × 18 mm)',
    },
    weightGrams: 160,
    layerHeight: '0.05mm Micro-Resin',
    infillDensity: '100% Solid Casting',
    printDurationHours: 11.0,
    inStock: true,
    leadTimeDays: 3,
    rating: 4.9,
    reviewCount: 33,
    features: [
      '1.8mm thick sound-dampened sidewalls produce deeper acoustic tones',
      'Micro-textured ergonomic dish matches finger pad curvature',
      'Reinforced MX stem cross prevents cracking on tight switch housings',
      'Complete 87-key Tenkeyless layout with keycap puller included'
    ],
    technicalSpecs: {
      'Profile': 'Custom Sculpted Cherry / OEM Hybrid',
      'Stem Type': 'Universal Cherry MX Cross-Stem Fitment',
      'Wall Thickness': '1.8mm High-Density Solid Polymer'
    },
    isHeroFeatured: false,
  }
];

export const CATEGORIES = [
  'All Products',
  'Desk & Workspace',
  'Smart Accessories',
  'Home Organization',
  'Phone & Tech Accessories',
  'Everyday Carry',
  'Custom 3D Prints',
  'Innovative Gadgets',
] as const;
