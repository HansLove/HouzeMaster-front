import { ModernNavigation } from '../components/ModernNavigation';
import { ModernFooter } from '../components/ModernFooter';
import { ModernPropertyFilters } from '../components/ModernPropertyFilters';
import { ModernListings } from '../components/ModernListings';

export default function ListingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ModernNavigation />
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              All Properties
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of premium properties in the most desirable locations
            </p>
          </div>

          {/* Filters and Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ModernPropertyFilters />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ModernListings />
            </div>
          </div>
        </div>
      </div>

      <ModernFooter />
    </main>
  );
}
