import { FaSearch, FaCar, FaLeaf } from "react-icons/fa";

export default function FeatureSection() {
  const features = [
    {
      icon: <FaSearch size={28} />,
      title: "Find a Ride",
      description: "Search verified rides that match your route."
    },
    {
      icon: <FaCar size={28} />,
      title: "Travel Together",
      description: "Book instantly and commute safely with trusted drivers."
    },
    {
      icon: <FaLeaf size={28} />,
      title: "Reduce Emissions",
      description: "Help lower traffic congestion and carbon emissions."
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl shadow-lg border hover:shadow-xl transition"
            >
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}