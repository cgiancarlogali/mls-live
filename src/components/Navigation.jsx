import React from 'react';
import { Search } from 'lucide-react';

export default function Navigation({ currentView, setCurrentView }) {
  return (
    <nav className="w-full bg-mls-bg border-b border-mls-card px-4 py-4 md:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-4">
        
        {/* Top Row: Logo & Main Navigation Tabs */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-mls-accent"></div>
            <h1 className="text-3xl font-bebas text-mls-text tracking-widest mt-1">MLS LIVE</h1>
          </div>

          <div className="flex bg-mls-card/10 border border-mls-card rounded p-1">
            <button 
              onClick={() => setCurrentView('DASHBOARD')}
              className={`px-6 py-1.5 text-sm font-dm uppercase tracking-widest rounded transition-colors ${currentView === 'DASHBOARD' ? 'bg-mls-card text-mls-text' : 'text-mls-card-hover hover:text-mls-text'}`}
            >
              Live Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('RESULTS')}
              className={`px-6 py-1.5 text-sm font-dm uppercase tracking-widest rounded transition-colors ${currentView === 'RESULTS' ? 'bg-mls-card text-mls-text' : 'text-mls-card-hover hover:text-mls-text'}`}
            >
              Results
            </button>
          </div>
        </div>

        {/* Bottom Row: Search & Filters */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search teams, players..." 
              className="w-full bg-mls-bg/50 border border-mls-card focus:border-mls-accent rounded-full py-2 px-4 pl-10 text-mls-text placeholder-mls-card-hover outline-none transition-colors font-dm text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mls-card-hover" />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {["All Competitions", "MLS Season", "Leagues Cup", "US Open Cup", "CCC"].map((filter, i) => (
              <button key={filter} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-dm border transition-colors ${i === 1 ? 'bg-mls-card border-mls-card text-mls-text' : 'border-mls-card text-mls-card-hover hover:border-mls-card-hover hover:text-mls-text'}`}>
                {filter}
              </button>
            ))}
          </div>

        </div>

      </div>
    </nav>
  );
}
