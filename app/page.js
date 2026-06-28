import HeroSection from './components/HeroSection';
import SocialProof from './components/SocialProof';
import FeaturedProducts from './components/FeaturedProducts';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <main className="pt-16 md:pt-20">
      <HeroSection />
      <SocialProof />
      <FeaturedProducts />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </main>
  );
}