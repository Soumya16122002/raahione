import { useState } from "react";

export default function SavingsCalculator() {
  const [distance, setDistance] = useState(30);
  const [days, setDays] = useState(22);
  const [mode, setMode] = useState("car");

  const rateAlone = mode === "car" ? 4 : 2.5;
  const rateRaahione = mode === "car" ? 1.6 : 0.9;

  const monthlyCost = distance * days * rateAlone;
  const raahioneCost = distance * days * rateRaahione;
  const savings = monthlyCost - raahioneCost;

  return (
    <section className="py-6 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">

        <div className="bg-[#141D2E] border border-slate-700 rounded-xl p-5">

          <h2 className="text-xl font-bold text-white mb-5">
            Calculate Your Savings
          </h2>

          <div className="grid lg:grid-cols-2 gap-5">

            <div>

              <div className="bg-slate-700 p-1 rounded-xl flex mb-8">

                <button
                  onClick={() => setMode("car")}
                  className={`flex-1 py-3 rounded-lg ${
                    mode === "car"
                      ? "bg-blue-500 text-white"
                      : "text-slate-300"
                  }`}
                >
                  Carpool
                </button>

                <button
                  onClick={() => setMode("bike")}
                  className={`flex-1 py-3 rounded-lg ${
                    mode === "bike"
                      ? "bg-blue-500 text-white"
                      : "text-slate-300"
                  }`}
                >
                  Bikepool
                </button>

              </div>

              <div className="mb-8">

                <div className="flex justify-between text-white mb-3">
                  <span>Daily Distance</span>
                  <span>{distance} KM</span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="100"
                  value={distance}
                  onChange={(e) =>
                    setDistance(Number(e.target.value))
                  }
                  className="w-full"
                />

              </div>

              <div>

                <div className="flex justify-between text-white mb-3">
                  <span>Days per Month</span>
                  <span>{days} Days</span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="30"
                  value={days}
                  onChange={(e) =>
                    setDays(Number(e.target.value))
                  }
                  className="w-full"
                />

              </div>

            </div>

            <div className="space-y-3">

              <div className="bg-slate-800/70 rounded-xl p-4">
                <p className="text-slate-400 text-sm uppercase">
                  Monthly Cost (Alone)
                </p>

                <h3 className="text-3xl font-bold text-white mt-2">
                  ₹{monthlyCost.toFixed(0)}
                </h3>
              </div>

              <div className="bg-slate-800/70 rounded-xl p-4">
                <p className="text-slate-400 text-sm uppercase">
                  Monthly Cost (Raahione)
                </p>

                <h3 className="text-2xl font-bold text-white mt-1">
                  ₹{raahioneCost.toFixed(0)}
                </h3>
              </div>

              <div className="bg-green-900 rounded-2xl p-5">
                <p className="text-green-300 text-sm uppercase">
                  Your Monthly Savings
                </p>

                <h3 className="text-3xl font-bold text-green-400 mt-1">
                  ₹{savings.toFixed(0)}
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

