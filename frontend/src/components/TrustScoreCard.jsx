export default function TrustScoreCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
      <h3 className="text-5xl font-bold text-green-600">
        94
      </h3>

      <p className="text-gray-500 mt-2">
        Average Trust Score
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-6">
        <div className="bg-green-500 h-3 rounded-full w-[94%]"></div>
      </div>
    </div>
  );
}