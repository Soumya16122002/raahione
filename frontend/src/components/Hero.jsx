import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function MapSVG() {
  return (
    <svg viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[180px]">
      {/* Grid lines */}
      {[40, 100, 160, 220, 280].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[45, 90, 135].map((y) => (
        <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {/* Buildings */}
      <rect x="50" y="55" width="50" height="30" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="130" y="30" width="60" height="40" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="200" y="70" width="70" height="35" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <rect x="60" y="105" width="80" height="50" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      {/* Route line */}
      <polyline
        points="70,150 70,120 140,80 200,90 270,40"
        stroke="#3B82F6"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Origin dot */}
      <circle cx="70" cy="150" r="6" fill="#3B82F6" />
      <circle cx="70" cy="150" r="11" fill="rgba(59,130,246,0.2)" />
      {/* Destination dot */}
      <circle cx="270" cy="40" r="5" fill="#F97316">
        <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="270" cy="40" r="11" fill="rgba(249,115,22,0.2)" />
      {/* Labels */}
      <text x="78" y="154" fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="Inter,sans-serif">Your location</text>
      <text x="240" y="36" fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="Inter,sans-serif">Office</text>
    </svg>
  );
}

function SavingsCalculator() {
  const [mode, setMode] = useState("car");
  const [dist, setDist] = useState(30);
  const [days, setDays] = useState(22);

  const rateAlone = mode === "car" ? 4 : 2.5;
  const rateRh    = mode === "car" ? 1.6 : 0.9;
  const alone     = Math.round(dist * days * rateAlone);
  const rh        = Math.round(dist * days * rateRh);
  const saved     = alone - rh;
  const fmt       = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="bg-[#141D2E] border border-white/[0.07] rounded-2xl p-6 mt-4">
      <h3 className="font-display text-white font-bold text-lg mb-5 tracking-tight">Calculate Your Savings</h3>

      {/* Mode tabs */}
      <div className="flex bg-white/[0.06] rounded-lg p-1 mb-5">
        {["car", "bike"].map((t) => (
          <button
            key={t}
            onClick={() => setMode(t)}
            className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              mode === t ? "bg-blue-500 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t === "car" ? "Carpool" : "Bikepool"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Sliders */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-white/40 uppercase tracking-wider">Daily Distance</span>
              <span className="text-sm font-semibold text-white font-display">{dist} KM</span>
            </div>
            <input
              type="range" min="5" max="80" step="1" value={dist}
              onChange={(e) => setDist(+e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-white/40 uppercase tracking-wider">Days per Month</span>
              <span className="text-sm font-semibold text-white font-display">{days} days</span>
            </div>
            <input
              type="range" min="5" max="30" step="1" value={days}
              onChange={(e) => setDays(+e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          {[
            { label: "Monthly cost (alone)", value: fmt(alone), highlight: false },
            { label: "Monthly cost (Raahione)", value: fmt(rh), highlight: false },
            { label: "Your monthly savings", value: fmt(saved), highlight: true },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className={`rounded-xl px-3 py-2.5 ${
                highlight
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-white/[0.04] border border-white/[0.07]"
              }`}
            >
              <p className={`text-[10px] uppercase tracking-wider mb-0.5 ${highlight ? "text-green-300/60" : "text-white/35"}`}>
                {label}
              </p>
              <p className={`font-display text-xl font-extrabold tracking-tight ${highlight ? "text-green-400" : "text-white"}`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1120]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Nav */}


      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a9 9 0 100 18A9 9 0 0010 1zm.75 5.25a.75.75 0 00-1.5 0v4.5l-2.47 1.48a.75.75 0 00.74 1.3l2.73-1.64a.75.75 0 00.49-.7v-4.94z" clipRule="evenodd"/>
              </svg>
              Aadhaar-verified network
            </span>

            <h1 className="font-display text-5xl lg:text-[3.6rem] font-extrabold text-white leading-[1.07] tracking-[-1.5px] mb-5">
              Share Rides.<br />
              <span className="text-blue-400">Save Money.</span><br />
              Travel Smarter.
            </h1>

            <p className="text-white/50 text-base leading-relaxed max-w-md mb-9">
              The smarter, more affordable daily commute for Rural-to-Urban, Tier-2/3,
              and Metro communities across India.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 transition-colors text-white font-semibold px-6 py-3.5 rounded-xl text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                Find a Ride
              </button>
              <button className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] transition-colors border border-white/[0.12] text-white font-semibold px-6 py-3.5 rounded-xl text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Offer a Ride
              </button>
            </div>

            {/* Mode cards */}
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          <div className="bg-[#1E3A5F] border border-blue-500/20 rounded-xl p-4 relative overflow-hidden">
                            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">For Car Owners</p>
                            <p className="font-display text-white text-xl font-extrabold tracking-tight mb-1.5">Carpooling</p>
                            <p className="text-white/45 text-xs leading-relaxed mb-3">Recover up to 75% of fuel costs monthly.</p>
                            <button className="flex items-center gap-1.5 bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg">
                              Share Your Ride
                            </button>
                            <span className="absolute right-3 bottom-3 text-5xl opacity-[0.06]">🚗</span>
                          </div>
                          <div className="bg-[#3D1A0A] border border-orange-500/20 rounded-xl p-4 relative overflow-hidden">
                            <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-2">For Bike Owners</p>
                            <p className="font-display text-white text-xl font-extrabold tracking-tight mb-1.5">Bikepooling</p>
                            <p className="text-white/45 text-xs leading-relaxed mb-3">Fastest commute. Split petrol costs daily.</p>
                            <button className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg">
                              Hop on a Bike
                            </button>
                            <span className="absolute right-3 bottom-3 text-5xl opacity-[0.06]">🏍️</span>
                          </div>
                        </div>

            {/* Feature pills */}
            <div className="flex gap-3 mt-10 flex-wrap">
              {[
                { icon: "🛡️", text: "Aadhaar Verified" },
                { icon: "🌿", text: "Eco-Friendly" },
                { icon: "💰", text: "Save up to 75%" },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] text-white/60 text-xs px-3 py-1.5 rounded-full">
                  {icon} {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — map + calculator */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-0"
          >
            {/* Map card */}
            <div className="bg-[#141D2E] border border-white/[0.07] rounded-2xl p-5">
              <MapSVG />
              <div className="flex items-center gap-5 mt-4">
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" /> Carpooling
                </span>
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" /> Bikepooling
                </span>
                <span className="ml-auto text-xs text-white/30">30 km · 45 min</span>
              </div>
            </div>



            {/* Savings calculator */}
            <SavingsCalculator />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
