import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LiveMatches from './components/LiveMatches';
import StandingsTable from './components/StandingsTable';
import TournamentHub from './components/TournamentHub';
import TeamDetailPanel from './components/TeamDetailPanel';
import ResultsView from './components/ResultsView';
import { getLiveMatches, getStandings, getTournaments } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('DASHBOARD'); // 'DASHBOARD' | 'RESULTS'
  
  const [liveMatches, setLiveMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [matchesData, standingsData, tournamentsData] = await Promise.all([
        getLiveMatches(),
        getStandings(),
        getTournaments()
      ]);
      setLiveMatches(matchesData?.events || []);
      setStandings(standingsData?.table || []);
      setTournaments(tournamentsData || []);
    } catch (err) {
      console.error("Failed to load initial data", err);
    }
  };

  useEffect(() => {
    fetchData(); // Initial load
    const intervalId = setInterval(fetchData, 60000); // 60s auto-refresh
    return () => clearInterval(intervalId);
  }, []);

  const handleTeamClick = (teamName) => {
    setSelectedTeam(teamName);
    setIsPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-mls-bg text-mls-text flex flex-col font-dm overflow-x-hidden">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8">
        
        {currentView === 'DASHBOARD' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            {/* Left Column - Live Matches (3 columns on lg) */}
            <div className="lg:col-span-3 lg:col-start-1">
              <LiveMatches matches={liveMatches} />
            </div>
            
            {/* Center Column - Standings (6 columns on lg) */}
            <div className="lg:col-span-6 lg:col-start-4">
              <StandingsTable table={standings} onTeamClick={handleTeamClick} />
            </div>
            
            {/* Right Column - Tournament Hub (3 columns on lg) */}
            <div className="lg:col-span-3 lg:col-start-10">
              <TournamentHub tournaments={tournaments} />
            </div>
          </div>
        )}

        {currentView === 'RESULTS' && (
          <div className="animate-in fade-in duration-500">
            <ResultsView selectedTeam={selectedTeam} />
          </div>
        )}

      </main>

      <TeamDetailPanel 
        teamName={selectedTeam} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </div>
  );
}

export default App;
