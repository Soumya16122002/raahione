export default function TrustBadge({ score }) {
  return (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
      Trust {score}/100
    </span>
  );
}