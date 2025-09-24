import { Suspense } from 'react';
import { ModernHero } from './components/ModernHero';
import { ModernNavigation } from './components/ModernNavigation';
import { ModernFooter } from './components/ModernFooter';
import { WhyHouzeMaster } from './components/WhyHouzeMaster';
import { PaymentOptions } from './components/PaymentOptions';
import { TokenizationSection } from './components/TokenizationSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Loading translations...</span>
          </div>
        </div>
      }>
        <ModernNavigation />
        <ModernHero />
        <WhyHouzeMaster />
        <PaymentOptions />
        <TokenizationSection />
        <ModernFooter />
      </Suspense>
    </main>
  );
}