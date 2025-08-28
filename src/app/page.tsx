import { ModernHero } from './components/ModernHero';
import { ModernListings } from './components/ModernListings';
import { ModernNavigation } from './components/ModernNavigation';
import { ModernFooter } from './components/ModernFooter';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ModernNavigation />
      <ModernHero />
      <ModernListings />
      <ModernFooter />
    </main>
  );
}
