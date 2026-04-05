import React from 'react';

export default function PastMatchCard({ match, onClick }) {
  return (
    <div 
      onClick={() => onClick(match)}
      className="p-4 border border-mls-card/40 bg-mls-bg rounded hover:bg-mls-card/10 transition-colors cursor-pointer group"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs uppercase text-mls-card-hover tracking-wider font-dm transition-colors group-hover:text-mls-accent/80">{match.strLeague}</span>
        <span className="text-[10px] bg-mls-card/50 px-2 py-0.5 rounded text-mls-text font-bold tracking-widest uppercase">FINAL</span>
      </div>
      <div className="flex justify-between items-center text-mls-text/80 transition-colors group-hover:text-mls-text">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bebas tracking-wide">{match.strHomeTeam}</div>
          <div className="text-xl font-bebas tracking-wide">{match.strAwayTeam}</div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="text-xl font-bebas">{match.intHomeScore ?? '-'}</div>
          <div className="text-xl font-bebas">{match.intAwayScore ?? '-'}</div>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-[10px] uppercase text-mls-card-hover/60 font-dm border-t border-mls-card/20 pt-2 transition-colors group-hover:text-mls-card-hover">
        <span>{match.dateEvent}</span>
        <span>{match.strVenue}</span>
      </div>
    </div>
  );
}
