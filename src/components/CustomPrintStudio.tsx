import React, { useState, useId } from 'react';
import { UploadCloud, CheckCircle2, Sliders, ShieldCheck, Cpu, Layers, FileCode, ArrowRight, Clock, MapPin } from 'lucide-react';
import { CustomProjectSubmission } from '../types';

interface CustomPrintStudioProps {
  onSuccess?: (submission: CustomProjectSubmission) => void;
}

export const CustomPrintStudio: React.FC<CustomPrintStudioProps> = ({ onSuccess }) => {
  const formId = useId();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('Functional Prototype');
  const [description, setDescription] = useState('');
  const [dimX, setDimX] = useState(120);
  const [dimY, setDimY] = useState(85);
  const [dimZ, setDimZ] = useState(60);
  const [material, setMaterial] = useState('PETG-CF (Carbon Fiber Reinforced)');
  const [color, setColor] = useState('Stealth Matte Black');
  const [layerHeight, setLayerHeight] = useState('0.12mm Precision');
  const [infill, setInfill] = useState(30);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>('bracket_mount_rev3.stl');
  const [fileSizeMb, setFileSizeMb] = useState<number | null>(4.8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<CustomProjectSubmission | null>(null);

  // Dynamic Volume Calculation (bounding box approximation with infill density factor)
  const volumeCm3 = Math.max(1, Math.round(((dimX * dimY * dimZ) / 1000) * 0.42 * (infill / 100 + 0.35)));

  // Material multipliers
  const materialMultipliers: Record<string, number> = {
    'PETG-CF (Carbon Fiber Reinforced)': 0.32,
    'Matte PLA Pro Polymer': 0.18,
    'UV Tough Engineering Resin': 0.45,
    'TPU 95A Flexible Elastomer': 0.28,
    'Polycarbonate High-Temp': 0.38,
    'Nylon PA12 Industrial': 0.48,
  };

  const materialRate = materialMultipliers[material] || 0.25;
  const estimatedHours = Math.max(1.5, ((volumeCm3 * 0.12) / (layerHeight.includes('0.28') ? 2.5 : layerHeight.includes('0.12') ? 1.0 : 1.4)));
  const baseCost = 18; // CAD machine prep and file inspection
  const materialCost = volumeCm3 * materialRate;
  const machineCost = estimatedHours * 3.8;
  const unitPriceCAD = Math.round(baseCost + materialCost + machineCost);
  // Quantity discount
  const quantityDiscount = quantity >= 10 ? 0.25 : quantity >= 5 ? 0.15 : quantity >= 2 ? 0.08 : 0;
  const totalCostCAD = Math.round(unitPriceCAD * quantity * (1 - quantityDiscount));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSizeMb(Number((file.size / (1024 * 1024)).toFixed(2)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: CustomProjectSubmission = {
        id: `ONT-3D-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName,
        email,
        phone,
        company,
        projectCategory: category,
        description,
        dimensionsMm: { x: dimX, y: dimY, z: dimZ },
        material,
        color,
        infillPercent: infill,
        layerHeight,
        quantity,
        estimatedVolumeCm3: volumeCm3,
        estimatedPriceCAD: totalCostCAD,
        fileName: fileName || undefined,
        fileSizeMb: fileSizeMb || undefined,
        notes,
        createdAt: new Date().toISOString(),
      };

      setSubmittedData(newSubmission);
      setIsSubmitting(false);
      if (onSuccess) onSuccess(newSubmission);
    }, 600);
  };

  if (submittedData) {
    return (
      <div className="bg-[#0D0F17] border border-cyan-500/30 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2">
          INQUIRY RECEIVED · {submittedData.id}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Your Project Is Queued for DFM Engineering Review
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Thank you, <span className="text-white font-medium">{submittedData.customerName}</span>. Our additive manufacturing team in Ontario has received your model specs for <span className="text-cyan-300 font-medium">{submittedData.projectCategory}</span>. A manufacturing engineer will review your geometry and email you with final tooling tolerances within 4 business hours.
        </p>

        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 text-left mb-6 font-mono text-xs space-y-2 text-slate-300">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-500">Estimated Target:</span>
            <span className="text-cyan-300 font-bold">${submittedData.estimatedPriceCAD}.00 CAD ({submittedData.quantity} units)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Material & Finish:</span>
            <span>{submittedData.material} · {submittedData.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Bounding Envelope:</span>
            <span>{submittedData.dimensionsMm.x} × {submittedData.dimensionsMm.y} × {submittedData.dimensionsMm.z} mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Production Facility:</span>
            <span>Ontario Additive Lab, Canada</span>
          </div>
          {submittedData.fileName && (
            <div className="flex justify-between">
              <span className="text-slate-500">Uploaded CAD File:</span>
              <span className="text-slate-200">{submittedData.fileName} ({submittedData.fileSizeMb} MB)</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setSubmittedData(null)}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          Submit Another CAD Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0D14] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141724_1px,transparent_1px),linear-gradient(to_bottom,#141724_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Header & Value Proposition */}
      <div className="relative max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>BESPOKE ADDITIVE MANUFACTURING · ONTARIO, CANADA</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          YOUR IDEA. OUR TECHNOLOGY.
        </h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
          Have an idea? Let's bring it to life. From single functional prototypes and high-stress mechanical brackets to limited batch production, we print your 3D models with aerospace-grade precision in Ontario.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Model Parameters & File Upload (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* File Upload Box */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-700/80 bg-slate-900/40 hover:border-cyan-500/50 transition-colors group">
            <input
              type="file"
              id={`${formId}-file`}
              accept=".stl,.3mf,.step,.stp,.obj"
              onChange={handleFileChange}
              className="sr-only"
            />
            <label
              htmlFor={`${formId}-file`}
              className="cursor-pointer flex flex-col items-center justify-center text-center py-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-white mb-1">
                {fileName ? fileName : 'Upload 3D CAD Model (STL, 3MF, STEP, OBJ)'}
              </span>
              <span className="text-xs text-slate-400 mb-3">
                {fileName ? `File size: ${fileSizeMb} MB · Click to replace` : 'Drag and drop or browse files up to 100MB'}
              </span>
              <span className="inline-flex items-center text-xs font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded px-2.5 py-1">
                Instant Automatic Slicing Analysis
              </span>
            </label>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="Functional Prototype">Functional Prototype</option>
                <option value="Custom Mechanical Bracket">Custom Mechanical Bracket</option>
                <option value="Electronic Enclosure">Electronic Enclosure</option>
                <option value="End-Use Consumer Product">End-Use Consumer Product</option>
                <option value="Architectural Scale Model">Architectural Scale Model</option>
                <option value="Replacement / Vintage Part">Replacement / Vintage Part</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="PETG-CF (Carbon Fiber Reinforced)">PETG-CF (Carbon Fiber Reinforced) — Stiff & Heat Resistant</option>
                <option value="Matte PLA Pro Polymer">Matte PLA Pro — Premium Surface Detail</option>
                <option value="UV Tough Engineering Resin">UV Tough Resin — Ultra-Fine 50 Micron</option>
                <option value="TPU 95A Flexible Elastomer">TPU 95A — Flexible & Shock-Absorbing</option>
                <option value="Polycarbonate High-Temp">Polycarbonate — Extreme Impact & 110°C Temp</option>
                <option value="Nylon PA12 Industrial">Nylon PA12 — Maximum Wear Resistance</option>
              </select>
            </div>
          </div>

          {/* Dimensions Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Bounding Dimensions (mm)
              </label>
              <span className="text-xs font-mono text-cyan-400">
                Envelope: {dimX} × {dimY} × {dimZ} mm (~{volumeCm3} cm³)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">X (Length)</span>
                <input
                  type="number"
                  min="10"
                  max="450"
                  value={dimX}
                  onChange={(e) => setDimX(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-mono text-sm focus:outline-none font-bold"
                />
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Y (Width)</span>
                <input
                  type="number"
                  min="10"
                  max="450"
                  value={dimY}
                  onChange={(e) => setDimY(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-mono text-sm focus:outline-none font-bold"
                />
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-mono">Z (Height)</span>
                <input
                  type="number"
                  min="5"
                  max="500"
                  value={dimZ}
                  onChange={(e) => setDimZ(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-mono text-sm focus:outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* Fine Tuning: Infill & Layer Resolution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Internal Infill Density
                </label>
                <span className="text-xs font-mono text-slate-400">{infill}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="5"
                value={infill}
                onChange={(e) => setInfill(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>15% Light</span>
                <span>30% Standard</span>
                <span>100% Solid</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Layer Resolution
              </label>
              <select
                value={layerHeight}
                onChange={(e) => setLayerHeight(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3.5 py-2 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="0.08mm Ultra-Fine">0.08mm Ultra-Fine (Microscopically Smooth)</option>
                <option value="0.12mm Precision">0.12mm Precision (Recommended Standard)</option>
                <option value="0.20mm Standard">0.20mm Balanced Structural</option>
                <option value="0.28mm Rapid Draft">0.28mm Rapid Prototyping Draft</option>
              </select>
            </div>
          </div>

          {/* Color & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Color Finish
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3.5 py-2 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="Stealth Matte Black">Stealth Matte Black</option>
                <option value="Industrial Charcoal Gray">Industrial Charcoal Gray</option>
                <option value="High-Temp Signal Orange">High-Temp Signal Orange</option>
                <option value="Cyber Electric Cyan">Cyber Electric Cyan</option>
                <option value="Glacier Titanium White">Glacier Titanium White</option>
                <option value="Military Olive Drab">Military Olive Drab</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Batch Quantity
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-24 bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono font-bold focus:border-cyan-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400">
                  {quantity >= 10 ? '✨ 25% Batch Tier applied' : quantity >= 5 ? '✨ 15% Batch Tier applied' : '1–4 units: Rapid Turnaround'}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Technical Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Project Description & Requirements
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your design, intended mechanical loading, heat constraints, or thread inserts needed..."
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 text-sm focus:border-cyan-500 focus:outline-none placeholder-slate-500"
              required
            />
          </div>
        </div>

        {/* Right Column: Live Instant Quote Card & Contact details (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#111420] to-[#0A0C14] border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">Instant Additive Estimate</span>
              <h3 className="text-xl font-bold text-white">Live Cost Breakdown</h3>
            </div>
            <span className="text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded">
              CAD Currency
            </span>
          </div>

          {/* Estimated Pricing Metric */}
          <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-slate-400">Estimated Total:</span>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  ${totalCostCAD}.00
                </span>
                <span className="text-xs text-slate-400 ml-1">CAD</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/80">
              <span>Unit Rate: ${Math.round(totalCostCAD / quantity)}.00/unit</span>
              <span>Machine Time: ~{Math.round(estimatedHours * quantity)}h</span>
            </div>
          </div>

          {/* Telemetry Breakdown */}
          <div className="space-y-2.5 text-xs text-slate-300 font-mono mb-6">
            <div className="flex justify-between">
              <span className="text-slate-500">Material Selection:</span>
              <span className="text-right truncate max-w-[180px]">{material.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Layer Spec:</span>
              <span>{layerHeight.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Internal Density:</span>
              <span>{infill}% Gyroid / Honeycomb</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Facility Location:</span>
              <span>Ontario, Canada</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Standard Lead Time:</span>
              <span>2–4 business days</span>
            </div>
          </div>

          {/* Contact Information Fields */}
          <div className="space-y-3 pt-4 border-t border-slate-800 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.ca"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone / SMS (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(416) 555-0192"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Organization / Company (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Studio / Firm name"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Preparing Additive Toolpath Analysis...</span>
            ) : (
              <>
                <span>START YOUR CUSTOM PROJECT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Strict NDA & Proprietary CAD Geometry Protection</span>
          </p>
        </div>
      </form>
    </div>
  );
};
