import VerificationBadge from "./VerificationBadge";
import TrustBadge from "./TrustBadge";

export default function DriverProfileCard() {
  return (
    <div className="flex items-center gap-4">

      <div className="w-16 h-16 rounded-full bg-slate-300"></div>

      <div>
        <h3 className="font-bold text-lg">
          Rahul Sharma
        </h3>

        <div className="flex gap-2 mt-1">
          <VerificationBadge />
          <TrustBadge score={92} />
        </div>

        <p className="text-gray-500 mt-1">
          ⭐ 4.8 Rating
        </p>
      </div>

    </div>
  );
}