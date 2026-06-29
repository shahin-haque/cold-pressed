import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <HeroSection />

      {/* Contact Form & Info */}
      <ContactSection />

      {/* FAQ Link */}
      <div className="section bg-muted">
        <div className="container-custom text-center">
          <p className="text-gray-600 mb-4">Have a question? Check our <Link href="/faq" className="text-primary hover:underline">FAQ page</Link></p>
        </div>
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-[#fff5f0] to-white py-16">
      <div className="container-custom text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get in <span className="text-secondary">Touch</span>
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          We&apos;d love to hear from you! Questions, feedback, or just want to say hello?
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Product Question</option>
                  <option>Partnership Opportunity</option>
                  <option>Press Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Fresh Street<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">hello@freshpress.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🚚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Delivery Hours</h3>
                    <p className="text-gray-600">
                      Fresh juices delivered<br />
                      Tue-Sun, 8am-8pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="text-xl">▶️</span>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-muted rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-gray-500">Map View</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

