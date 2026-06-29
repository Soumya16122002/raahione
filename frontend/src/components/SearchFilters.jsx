export default function SearchFilters() {
  return (
    <div className="bg-white rounded-3xl shadow p-5 mb-6">
      <div className="grid md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Source"
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          placeholder="Destination"
          className="border rounded-xl p-3"
        />

        <input
          type="date"
          className="border rounded-xl p-3"
        />

        <button className="bg-blue-600 text-white rounded-xl">
          Search
        </button>

      </div>
    </div>
  );
}