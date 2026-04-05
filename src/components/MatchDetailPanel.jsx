import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getMatchDetails } from '../services/api';

export default function MatchDetailPanel({ match, isOpen, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (isOpen && match?.idEvent) {
      setDetails(null);
      getMatchDetails(match.idEvent).then(data => setDetails(data));
    }
  }, [isOpen, match]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-mls-bg border-l border-mls-card z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full gap-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bebas text-mls-text tracking-wider">MATCH DETAILS</h2>
            <button onClick={onClose} className="p-1 hover:bg-mls-card/50 rounded transition-colors text-mls-text">
              <X className="w-6 h-6" />
            </button>
          </div>

          {!match ? null : !details ? (
            <div className="flex-1 flex justify-center items-center"><div className="pulse-dot w-3 h-3"></div></div>
          ) : (
            <div className="flex flex-col gap-8 pb-8">
              
              {/* Scorecard Header */}
              <div className="bg-mls-card/10 border border-mls-card/50 p-5 rounded text-center">
                <div className="text-xs text-mls-card-hover font-dm uppercase tracking-widest mb-3">{match.strLeague}</div>
                <div className="flex justify-between items-center text-mls-text font-bebas text-3xl">
                  <span className="flex-1 text-right">{match.strHomeTeam}</span>
                  <span className="px-4 text-mls-accent tracking-widest">{match.intHomeScore} - {match.intAwayScore}</span>
                  <span className="flex-1 text-left">{match.strAwayTeam}</span>
                </div>
                <div className="text-xs text-mls-card-hover font-dm mt-4 pt-3 border-t border-mls-card/30">{match.dateEvent} • {match.strVenue}</div>
              </div>

              {/* Match Events Timeline */}
              <div>
                <h3 className="text-lg font-bebas text-mls-text mb-4 border-b border-mls-card/40 pb-2">TIMELINE</h3>
                <div className="flex flex-col gap-3 font-dm text-sm">
                  {details.events.map((ev, i) => (
                    <div key={i} className={`flex ${ev.team === 'home' ? 'justify-start' : 'justify-end'}`}>
                      <div className="bg-mls-card/20 border border-mls-card/50 px-3 py-1.5 rounded flex items-center gap-2 text-mls-text">
                        <span className="text-mls-accent font-bold w-6 text-right">{ev.minute}'</span>
                        <span className="px-1">{ev.player}</span>
                        {ev.type === 'goal' && <span>⚽</span>}
                        {ev.type === 'yellow' && <span className="w-2.5 h-3.5 bg-yellow-400 rounded-sm inline-block"></span>}
                        {ev.type === 'red' && <span className="w-2.5 h-3.5 bg-red-500 rounded-sm inline-block"></span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Bar Chart */}
              <div>
                <h3 className="text-lg font-bebas text-mls-text mb-4 border-b border-mls-card/40 pb-2">TEAM STATS</h3>
                <div className="flex flex-col gap-5 text-sm font-dm text-mls-text">
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-mls-card-hover uppercase tracking-widest">
                      <span className="w-8">{details.possessionHome}%</span>
                      <span className="text-mls-text/90">Possession</span>
                      <span className="w-8 text-right">{details.possessionAway}%</span>
                    </div>
                    <div className="flex h-1.5 bg-mls-card/20 rounded overflow-hidden">
                      <div className="bg-mls-accent h-full transition-all" style={{ width: `${details.possessionHome}%` }}></div>
                      <div className="bg-mls-card h-full transition-all" style={{ width: `${details.possessionAway}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-mls-card-hover uppercase tracking-widest">
                      <span className="w-8">{details.shotsOnTargetHome}</span>
                      <span className="text-mls-text/90">Shots on Target</span>
                      <span className="w-8 text-right">{details.shotsOnTargetAway}</span>
                    </div>
                    <div className="flex h-1.5 bg-mls-card/20 rounded overflow-hidden">
                      <div className="bg-mls-accent h-full transition-all" style={{ width: `${(details.shotsOnTargetHome / (details.shotsOnTargetHome + details.shotsOnTargetAway)) * 100}%` }}></div>
                      <div className="bg-mls-card h-full transition-all" style={{ width: `${(details.shotsOnTargetAway / (details.shotsOnTargetHome + details.shotsOnTargetAway)) * 100}%` }}></div>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* MOTM */}
              {details.manOfTheMatch && (
                <div className="bg-mls-card/20 border border-mls-accent/40 p-5 text-center rounded">
                  <div className="text-xs text-mls-card-hover uppercase font-dm tracking-widest mb-2">Man of the Match</div>
                  <div className="text-2xl font-bebas text-mls-text tracking-wide">{details.manOfTheMatch}</div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </>
  );
}
