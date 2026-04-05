import React, { useState, useEffect } from 'react';
import PastMatchCard from './PastMatchCard';
import MatchDetailPanel from './MatchDetailPanel';
import { getPastMatches, getSeasonSummary } from '../services/api';

export default function ResultsView({ selectedTeam }) {
  const [seasonStats, setSeasonStats] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  
  const [dates, setDates] = useState([]);
  const [activeDate, setActiveDate] = useState('');
  
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' or 'TEAM'
  
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Generate last 14 days
  useEffect(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      arr.push(d.toISOString().split('T')[0]);
    }
    setDates(arr);
    setActiveDate(arr[0]);
    
    getSeasonSummary().then(data => setSeasonStats(data));
  }, []);

  // Fetch matches when activeDate changes
  useEffect(() => {
    if (!activeDate) return;
    setLoadingMatches(true);
    getPastMatches(activeDate).then(data => {
      setMatches(data?.events || []);
      setLoadingMatches(false);
    });
  }, [activeDate]);

  const filteredMatches = matches.filter(m => {
    if (filterMode === 'TEAM' && selectedTeam) {
      return m.strHomeTeam === selectedTeam || m.strAwayTeam === selectedTeam;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Season Summary Stats Bar */}
      {seasonStats && (
        <div className="flex flex-wrap md:flex-nowrap items-center border border-mls-card bg-mls-card/10 rounded overflow-hidden">
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-mls-card/50 text-center">
            <div className="text-[10px] text-mls-card-hover uppercase tracking-widest font-dm mb-1">Matches Played</div>
            <div className="text-3xl font-bebas text-mls-text">{seasonStats.matchesPlayed}</div>
          </div>
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-mls-card/50 text-center">
            <div className="text-[10px] text-mls-card-hover uppercase tracking-widest font-dm mb-1">Total Goals</div>
            <div className="text-3xl font-bebas text-mls-text">{seasonStats.totalGoals}</div>
          </div>
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-mls-card/50 text-center">
            <div className="text-[10px] text-mls-card-hover uppercase tracking-widest font-dm mb-1">Top Scorer</div>
            <div className="text-2xl flex items-center justify-center font-bebas text-mls-text h-[36px]">{seasonStats.topScorer}</div>
          </div>
          <div className="flex-1 p-4 text-center">
            <div className="text-[10px] text-mls-card-hover uppercase tracking-widest font-dm mb-1">Highest Scoring</div>
            <div className="text-2xl flex items-center justify-center font-bebas text-mls-text h-[36px]">{seasonStats.highestScoringMatch}</div>
          </div>
        </div>
      )}

      {/* Date Picker Scroller */}
      <div>
        <div className="flex overflow-x-auto scrollbar-hide gap-2 border-b border-mls-card/30 pb-3">
          {dates.map(date => {
            const dateObj = new Date(date);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = dateObj.getDate();
            const isActive = date === activeDate;
            
            // Mock indication: assuming recent dates all have games in our mock world.
            // In a real API, we would use a pre-fetched mapping of { [date]: hasMatch }.
            const hasMatches = true; 

            return (
              <button 
                key={date}
                onClick={() => setActiveDate(date)}
                className={`flex flex-col items-center justify-center min-w-[64px] p-2 rounded transition-colors ${isActive ? 'bg-mls-card/30 border border-mls-card/80' : 'hover:bg-mls-card/10 border border-transparent'}`}
              >
                <span className={`text-[10px] uppercase font-dm tracking-widest ${isActive ? 'text-mls-accent' : 'text-mls-card-hover'}`}>{dayName}</span>
                <span className={`text-2xl font-bebas ${isActive ? 'text-mls-text' : 'text-mls-text/60'}`}>{dayNum}</span>
                {hasMatches && (
                  <span className={`mt-1.5 w-1 h-1 rounded-full ${isActive ? 'bg-mls-accent' : 'bg-mls-card'}`}></span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Matches Grid and Filter */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl text-mls-text bebas-font tracking-wide">
            {activeDate === dates[0] ? 'TODAY\'S RESULTS' : 'MATCH RESULTS'}
          </h2>
          
          {/* Team Filter Toggle */}
          {selectedTeam && (
            <div className="flex bg-mls-bg border border-mls-card rounded overflow-hidden">
              <button 
                onClick={() => setFilterMode('ALL')}
                className={`px-4 py-1.5 text-xs font-dm uppercase tracking-widest transition-colors ${filterMode === 'ALL' ? 'bg-mls-card text-mls-text' : 'text-mls-card-hover hover:bg-mls-card/20'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterMode('TEAM')}
                className={`px-4 py-1.5 text-xs font-dm uppercase tracking-widest transition-colors ${filterMode === 'TEAM' ? 'bg-mls-card text-mls-text' : 'text-mls-card-hover hover:bg-mls-card/20'}`}
              >
                {selectedTeam} Only
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingMatches ? (
            <div className="col-span-full py-20 flex justify-center text-mls-card-hover text-sm tracking-widest font-dm uppercase">
              Loading Data... <span className="pulse-dot"></span>
            </div>
          ) : filteredMatches.length > 0 ? (
            filteredMatches.map(m => (
              <PastMatchCard key={m.idEvent} match={m} onClick={(match) => setSelectedMatch(match)} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-mls-card-hover font-dm uppercase tracking-widest border border-mls-card/30 rounded bg-mls-card/5 text-sm">
              No matches found {filterMode === 'TEAM' ? `for ${selectedTeam}` : 'for this date'}.
            </div>
          )}
        </div>
      </div>

      {/* Modal Expansion */}
      <MatchDetailPanel match={selectedMatch} isOpen={!!selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}
