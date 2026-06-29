import VerificationBadge from "./VerificationBadge";

export default function VerifiedUserCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-slate-300"></div>

        <div>
          <h3 className="font-bold text-xl">
            Verified Driver
          </h3>

          <VerificationBadge />
        </div>

      </div>

      <div className="mt-6 space-y-2">

        <p>✓ Aadhaar Verified</p>

        <p>✓ Driving License Verified</p>

        <p>✓ Vehicle RC Verified</p>

        <p>✓ Profile Verified</p>

      </div>

    </div>
  );
}