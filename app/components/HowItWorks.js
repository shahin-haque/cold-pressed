export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Blend',
      description: 'Browse our selection of premium cold-pressed juices crafted for your wellness goals.',
    },
    {
      number: '02',
      title: 'We Press Fresh',
      description: 'We cold-press your order in small batches using organic ingredients.',
    },
    {
      number: '03',
      title: 'Fast Delivery',
      description: 'Your fresh juice arrives at your door within 24 hours, packed in eco-friendly packaging.',
    },
    {
      number: '04',
      title: 'Enjoy & Thrive',
      description: 'Store in the fridge and enjoy within 5 days for maximum benefits.',
    },
  ];

  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting your daily dose of wellness has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative h-full">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border/50 hover:border-primary transition-colors h-full flex flex-col">
                <div className="text-5xl md:text-6xl font-bold text-primary/20 mb-3 md:mb-4">{step.number}</div>
                <h3 className="text-lg md:text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}