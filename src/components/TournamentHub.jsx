import React, { useState } from 'react';
import { ChevronRight, Trophy } from 'lucide-react';

export default function TournamentHub({ tournaments }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl text-mls-text m-0 bebas-font border-b border-mls-card pb-2">TOURNAMENT HUB</h2>
      
      <div className="flex flex-col gap-4">
        {tournaments && tournaments.map((t) => (
          <div key={t.id} className="border border-mls-card bg-mls-card/10 hover:bg-mls-card/20 transition-all duration-300">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(t.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-mls-card flex items-center justify-center bg-mls-bg text-mls-card-hover rounded">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-mls-text font-bebas text-lg tracking-wide">{t.name}</span>
                  <span className="text-xs text-mls-accent">{t.phase}</span>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-mls-card-hover transition-transform duration-300 ${expandedId === t.id ? 'rotate-90' : ''}`} />
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ${expandedId === t.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 pt-0 border-t border-mls-card/30">
                <p className="text-xs text-mls-card-hover mb-2 uppercase tracking-wide">Featured Matches</p>
                <div className="flex flex-col gap-2">
                  {t.matches.map((m, idx) => (
                    <div key={idx} className="text-sm font-dm text-mls-text flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-mls-card-hover before:rounded-full">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
