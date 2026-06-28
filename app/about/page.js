import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <HeroSection />

      {/* Story */}
      <StorySection />

      {/* Values */}
      <ValuesSection />

      {/* Team */}
      <TeamSection />

      {/* CTA */}
      <CTASection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#fff5f0] to-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-leaves opacity-30" />
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Our <span className="text-secondary">Story</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Born from a simple belief: everyone deserves access to the freshest, most nutritious juices
          without compromise.
        </p>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-square bg-muted rounded-3xl flex items-center justify-center text-[10rem]">
              🥤
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Fresh Press Began
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Fresh Press started in 2018 with a small cold-press machine in a garage
                and a big dream: to make fresh, nutritious juices accessible to everyone.
              </p>
              <p>
                Our founders, Sarah and Mike, were frustrated by the lack of truly fresh options
                in stores. Everything was shipped long distances, loaded with preservatives,
                or simply not fresh enough.
              </p>
              <p>
                They decided to do something about it—sourcing local organic produce
                and pressing juices in small batches right in their community.
              </p>
              <p>
                Today, we serve over 50,000 customers across the country,
                but our commitment remains the same: press the freshest juices
                possible and deliver them within 24 hours.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-gray-500">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-500">Organic</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24hr</div>
                <div className="text-sm text-gray-500">Fresh Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: '🌱',
      title: 'Farm-Fresh',
      description: 'We source from local organic farms within 100 miles of our press facility.',
    },
    {
      icon: '❄��',
      title: 'Cold Pressed',
      description: 'Our hydraulic press retains more nutrients than traditional methods.',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Every bottle ships within 24 hours of pressing.',
    },
    {
      icon: '💚',
      title: 'Pure & Simple',
      description: 'Zero preservatives, zero added sugar, just nature.',
    },
  ];

  return (
    <section className="section bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Values</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every decision we make is guided by these core principles.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Co-Founder & CEO',
      image: '👩‍💼',
      bio: 'Former wellness coach with 10+ years in nutrition.',
    },
    {
      name: 'Mike Johnson',
      role: 'Co-Founder & Head of Operations',
      image: '👨‍💼',
      bio: 'Expert in cold-press technology and food safety.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Sourcing',
      image: '👩‍🎨',
      bio: 'Works directly with organic farms across the region.',
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      image: '👨‍🔬',
      bio: 'Blend architect and flavor enthusiast.',
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet The <span className="text-primary">Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate people dedicated to your wellness.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                {member.image}
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section bg-gray-900 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Join the Fresh Revolution?
        </h2>
        <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
          Discover why thousands of customers trust Fresh Press for their daily wellness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
            Shop Juices
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/contact" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-gray-900 transition-all">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}