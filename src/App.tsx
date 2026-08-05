import React, { useState, useMemo, useEffect } from 'react';
import { SAMPLE_PROPERTIES, FAQ_ITEMS } from './data/mockData';
import { Property, FilterState, Lead } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PropertyGrid } from './components/PropertyGrid';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { StatsBar } from './components/StatsBar';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DeliveredProjects } from './components/DeliveredProjects';
import { FAQAccordion } from './components/FAQAccordion';
import { ContactForm } from './components/ContactForm';
import { BookTourModal } from './components/BookTourModal';
import { ChatWidget } from './components/ChatWidget';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LeadsAdminModal } from './components/LeadsAdminModal';
import { Footer } from './components/Footer';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  neighborhood: 'all',
  propertyType: 'all',
  minPrice: 0,
  maxPrice: 50000000,
  bedrooms: 'any',
  bathrooms: 'any',
  minSqft: 0,
  maxSqft: 10000,
  status: 'any'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'about' | 'contact' | 'faq'>('home');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookTourOpen, setBookTourOpen] = useState(false);
  const [bookTourTitle, setBookTourTitle] = useState<string | undefined>(undefined);
  const [leadsAdminOpen, setLeadsAdminOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch initial leads from server if available
  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.leads) {
          setLeads(data.leads);
        }
      })
      .catch(() => {});
  }, []);

  const handleLeadAdded = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleOpenBookTour = (propertyTitle?: string) => {
    setBookTourTitle(propertyTitle);
    setBookTourOpen(true);
  };

  // Filter Properties
  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter(property => {
      // Search text
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchTitle = property.title.toLowerCase().includes(query);
        const matchNeighborhood = property.neighborhood.toLowerCase().includes(query);
        const matchType = property.propertyType.toLowerCase().includes(query);
        const matchDesc = property.description.toLowerCase().includes(query);
        const matchAmenity = property.amenities.some(a => a.toLowerCase().includes(query));

        if (!matchTitle && !matchNeighborhood && !matchType && !matchDesc && !matchAmenity) {
          return false;
        }
      }

      // Neighborhood
      if (filters.neighborhood !== 'all' && property.neighborhood !== filters.neighborhood) {
        return false;
      }

      // Property Type
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Status
      if (filters.status !== 'any' && property.status !== filters.status) {
        return false;
      }

      // Min Price
      if (filters.minPrice > 0 && property.priceETB < filters.minPrice) {
        return false;
      }

      // Max Price
      if (filters.maxPrice < 50000000 && property.priceETB > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'any') {
        const reqBeds = parseInt(filters.bedrooms);
        if (property.beds < reqBeds) return false;
      }

      // Bathrooms
      if (filters.bathrooms !== 'any') {
        const reqBaths = parseInt(filters.bathrooms);
        if (property.baths < reqBaths) return false;
      }

      // Min Sqft
      if (filters.minSqft > 0 && property.sqft < filters.minSqft) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const scrollToProperties = () => {
    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 font-sans selection:bg-[#0F4C3A] selection:text-amber-300">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBookTour={handleOpenBookTour}
        onOpenLeads={() => setLeadsAdminOpen(true)}
        leadsCount={leads.length}
      />

      {/* Main Page View Switch */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <Hero
              filters={filters}
              setFilters={setFilters}
              onSearchSubmit={() => {
                setActiveTab('projects');
                setTimeout(scrollToProperties, 100);
              }}
              onExploreProjects={() => {
                setActiveTab('projects');
                setTimeout(scrollToProperties, 100);
              }}
            />

            {/* Listings Grid with Filters */}
            <div id="properties-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
                resultsCount={filteredProperties.length}
              />

              <PropertyGrid
                properties={filteredProperties}
                onSelectProperty={setSelectedProperty}
                onBookTour={handleOpenBookTour}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Stats Bar */}
            <StatsBar />

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Delivered Projects Gallery */}
            <DeliveredProjects />

            {/* FAQ Accordion */}
            <FAQAccordion
              onAskAI={(questionText) => {
                // Could open AI widget or handle AI search
              }}
            />

            {/* Lead Capture Contact Section */}
            <ContactForm onLeadSubmitted={handleLeadAdded} />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-extrabold tracking-widest text-[#0F4C3A] uppercase bg-emerald-100 px-3.5 py-1 rounded-full">
                Addis Ababa Listings
              </span>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                All Available Properties
              </h1>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Filter by neighborhood, budget, status, or bedroom size across our entire real estate portfolio.
              </p>
            </div>

            <FilterBar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              resultsCount={filteredProperties.length}
            />

            <PropertyGrid
              properties={filteredProperties}
              onSelectProperty={setSelectedProperty}
              onBookTour={handleOpenBookTour}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'contact' && <ContactPage onLeadSubmitted={handleLeadAdded} />}

        {activeTab === 'faq' && (
          <div className="py-8">
            <FAQAccordion />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} onBookTour={() => handleOpenBookTour()} />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBookTour={handleOpenBookTour}
        allProperties={SAMPLE_PROPERTIES}
        onSelectProperty={setSelectedProperty}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Book a Tour Modal */}
      <BookTourModal
        isOpen={bookTourOpen}
        onClose={() => setBookTourOpen(false)}
        preselectedPropertyTitle={bookTourTitle}
        onSuccess={handleLeadAdded}
      />

      {/* Admin Captured Leads Modal */}
      <LeadsAdminModal
        isOpen={leadsAdminOpen}
        onClose={() => setLeadsAdminOpen(false)}
        leads={leads}
      />

      {/* Floating AI Assistant Chat Widget */}
      <ChatWidget
        onSelectProperty={setSelectedProperty}
        onBookTour={(title) => handleOpenBookTour(title)}
        onLeadCaptured={handleLeadAdded}
      />
    </div>
  );
}
