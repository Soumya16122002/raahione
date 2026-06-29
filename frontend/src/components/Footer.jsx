export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div>
            <h2 className="text-2xl font-bold">
              Raahione
            </h2>
            <p className="mt-2 text-gray-400">
              India's safest verified ride-sharing network.
            </p>
          </div>

          <div>
            <p>Find Ride</p>
            <p>Offer Ride</p>
            <p>Contact</p>
          </div>

        </div>

      </div>
    </footer>
  );
}