import { ModernHero } from './components/ModernHero';
import { ModernNavigation } from './components/ModernNavigation';
import { ModernFooter } from './components/ModernFooter';
import { WhyHouzeMaster } from './components/WhyHouzeMaster';
import { PaymentOptions } from './components/PaymentOptions';
import { TokenizationSection } from './components/TokenizationSection';

export default function Home({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <main className="min-h-screen">
      <ModernNavigation />
      <ModernHero />
      <WhyHouzeMaster />
      <PaymentOptions />
      <TokenizationSection />
      <ModernFooter />
    </main>
  );
}