import React from 'react';

export default function LiveMatches({ matches }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl text-mls-text bebas-font">
        LIVE TODAY <span className="pulse-dot"></span>
      </h2>
      <div className="flex flex-col gap-3">
        {matches && matches.length > 0 ? (
          matches.map((match, i) => (
            <div key={i} className={`p-4 border border-mls-card bg-mls-card/10 rounded hover:bg-mls-card/30 transition-colors ${match.strStatus === 'In Progress' ? 'shadow-[0_0_15px_rgba(149,213,178,0.15)] ring-1 ring-mls-accent' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase text-mls-accent/80 tracking-wider font-dm">{match.strLeague}</span>
                <span className="text-xs text-mls-accent font-medium">{match.strTime !== '00:00' ? match.strTime : match.strStatus}</span>
              </div>
              <div className="flex justify-between items-center text-mls-text">
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bebas tracking-wide">{match.strHomeTeam}</div>
                  <div className="text-xl font-bebas tracking-wide">{match.strAwayTeam}</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="text-xl font-bebas text-mls-text">{match.intHomeScore ?? '-'}</div>
                  <div className="text-xl font-bebas text-mls-text">{match.intAwayScore ?? '-'}</div>
                </div>
              </div>
              <div className="mt-4 text-[10px] uppercase text-mls-card-hover/90 font-dm border-t border-mls-card/50 pt-2">{match.strVenue}</div>
            </div>
          ))
        ) : (
          <div className="p-4 border border-mls-card bg-mls-bg text-mls-card-hover text-sm text-center font-dm">
            No matches scheduled today.
          </div>
        )}
      </div>
    </section>
  );
}
