export default function FAQPage() {
  return (
    <main className="pt-16 md:pt-20">
      <HeroSection />
      <FAQSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-[#fff5f0] to-white py-16">
      <div className="container-custom text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Find answers to the most common questions about our juices and service.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver Tuesday through Sunday, 8am to 8pm. Place your order by 2pm for next-day delivery.',
    },
    {
      question: 'How long do your juices last?',
      answer: 'Our juices are fresh and best enjoyed within 5 days of delivery. Store in the refrigerator.',
    },
    {
      question: 'Do you offer returns?',
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
    },
    {
      question: 'Can I customize my subscription?',
      answer: 'Absolutely! You can choose which juices you want, their frequency, and pause or cancel anytime.',
    },
    {
      question: 'Where do you source your ingredients?',
      answer: 'We source from certified organic farms within 100 miles of our facility to ensure maximum freshness.',
    },
    {
      question: 'Are your juices pasteurized?',
      answer: 'No! Our cold-press method preserves nutrients without heat. All juices are raw and unpasteurized.',
    },
    {
      question: 'Do you offer wholesale?',
      answer: 'Yes! We work with cafes, gyms, and retailers. Contact us for wholesale pricing.',
    },
    {
      question: 'How do I store my juices?',
      answer: 'Keep all juices refrigerated. Once opened, consume within 24 hours for best taste and nutrition.',
    },
  ];

  return (
    <section className="section bg-muted">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold hover:bg-gray-50">
                {faq.question}
                <span className="text-primary">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}