export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Rahul",
      text: "Saved thousands every month using Raahione."
    },
    {
      name: "Priya",
      text: "Much safer than traditional carpool apps."
    },
    {
      name: "Amit",
      text: "Found daily office commute partners easily."
    }
  ];

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          What Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow"
            >
              <p className="mb-4">{item.text}</p>

              <h4 className="font-bold">
                {item.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}