import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getTeamDetails } from '../services/api';

export default function TeamDetailPanel({ teamName, isOpen, onClose }) {
  const [teamData, setTeamData] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (isOpen && teamName) {
      setTeamData(null); // reset while loading
      getTeamDetails(teamName).then(data => {
        setTeamData(data);
      });
    }
  }, [isOpen, teamName]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-mls-bg border-l border-mls-card z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 flex flex-col h-full">

          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bebas text-mls-text tracking-wider">{teamName || 'Team Info'}</h2>
            <button onClick={onClose} className="p-1 hover:bg-mls-card rounded transition-colors text-mls-text">
              <X className="w-6 h-6" />
            </button>
          </div>

          {!teamData && isOpen ? (
            <div className="flex-1 flex items-center justify-center text-mls-card-hover">
              <div className="pulse-dot w-3 h-3"></div>
            </div>
          ) : teamData ? (
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex items-center justify-center p-6 border border-mls-card bg-mls-card/10">
                {teamData.strTeamBadge ? (
                  <img src={teamData.strTeamBadge} alt="badge" className="w-24 h-24 object-contain" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-mls-card animate-pulse"></div>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-mls-card">
                {['Overview', 'Squad', 'Fixtures'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-sm font-dm transition-colors border-b-2 ${activeTab === tab ? 'text-mls-accent border-mls-accent' : 'text-mls-card-hover border-transparent hover:text-mls-text'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 text-mls-text font-dm text-sm flex flex-col gap-4">
                {activeTab === 'Overview' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-mls-card-hover text-xs uppercase tracking-wide">Stadium</p>
                        <p>{teamData.strStadium || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-mls-card-hover text-xs uppercase tracking-wide">Capacity</p>
                        <p>{teamData.intStadiumCapacity || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-mls-card-hover text-xs uppercase tracking-wide">Location</p>
                        <p>{teamData.strLocation || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-mls-card-hover text-xs uppercase tracking-wide">Form</p>
                        <p className="flex gap-1 mt-1">
                          {['W','D','L','W','W'].map((char, i) => <span key={i} className={`w-2 h-2 rounded-full ${char==='W'?'bg-mls-accent':char==='D'?'bg-mls-card-hover':'bg-[#163627]'}`}></span>)}
                        </p>
                      </div>
                    </div>
                    {teamData.strDescriptionEN && (
                      <div className="mt-4">
                        <p className="text-mls-card-hover text-xs uppercase tracking-wide mb-1">About</p>
                        <p className="line-clamp-6 text-mls-text/80">{teamData.strDescriptionEN}</p>
                      </div>
                    )}
                  </>
                )}
                {activeTab !== 'Overview' && (
                  <div className="flex-1 flex items-center justify-center text-mls-card-hover/50 italic">
                    {activeTab} data not available in free tier
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-mls-card-hover">
              No data found for this team.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
