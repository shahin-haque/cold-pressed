export default function Benefits() {
  const benefits = [
    {
      icon: '❄️',
      title: 'Cold Pressed',
      description: 'Our hydraulic cold-press process extracts maximum nutrients without heat damage.',
    },
    {
      icon: '🌱',
      title: '100% Organic',
      description: 'We source only certified organic fruits and vegetables from local farms.',
    },
    {
      icon: '🚚',
      title: 'Fresh Delivery',
      description: 'Delivered within 24 hours of pressing to ensure peak freshness and nutrition.',
    },
    {
      icon: '💚',
      title: 'No Additives',
      description: 'Zero preservatives, zero added sugars, just pure nature in every bottle.',
    },
  ];

  return (
    <section className="section bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">Fresh Press</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re obsessive about quality. Every step, from sourcing to delivery,
            is designed to preserve the nutrition you deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}