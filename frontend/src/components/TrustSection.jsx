import TrustScoreCard from "./TrustScoreCard";
import VerifiedUserCard from "./VerifiedUserCard";

export default function TrustSection() {
  return (
    <section className="py-10 bg-slate-50">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Built Around Trust & Safety
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <TrustScoreCard />

          <VerifiedUserCard />

        </div>

      </div>

    </section>
  );
}