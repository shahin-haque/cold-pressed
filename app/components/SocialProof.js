export default function SocialProof() {
  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '100%', label: 'Organic Ingredients' },
    { value: '4.9', label: 'Star Rating' },
    { value: '24hr', label: 'Delivery' },
  ];

  return (
    <section className="bg-gray-900 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}