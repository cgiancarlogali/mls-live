import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function StandingsTable({ table, onTeamClick }) {
  const [conference, setConference] = useState('Eastern');
  
  const toggleConference = () => {
    setConference(prev => prev === 'Eastern' ? 'Western' : 'Eastern');
  };

  const filteredTable = table ? table.filter(t => t.conference === conference).sort((a,b) => a.intRank - b.intRank) : [];

  return (
    <section className="flex flex-col gap-4">
      <div 
        onClick={toggleConference}
        className="flex justify-between items-center cursor-pointer border border-mls-card px-4 py-2 hover:bg-mls-card/20 transition-colors"
      >
        <h2 className="text-xl text-mls-text m-0 bebas-font">MLS {conference} Conference</h2>
        <ChevronDown className="w-5 h-5 text-mls-accent" />
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#163627] text-mls-card-hover font-bebas text-base uppercase">
            <tr>
              <th className="px-3 py-2 w-10 text-center font-normal tracking-wide">#</th>
              <th className="px-3 py-2 font-normal tracking-wide">Club</th>
              <th className="px-2 py-2 text-center font-normal tracking-wide">GP</th>
              <th className="px-2 py-2 text-center font-normal tracking-wide">W</th>
              <th className="px-2 py-2 text-center lg:table-cell hidden font-normal tracking-wide">D</th>
              <th className="px-2 py-2 text-center lg:table-cell hidden font-normal tracking-wide">L</th>
              <th className="px-2 py-2 text-center font-normal tracking-wide">Pts</th>
            </tr>
          </thead>
          <tbody className="font-dm">
            {filteredTable.map((row, i) => (
              <tr 
                key={i} 
                onClick={() => onTeamClick(row.strTeam)}
                className={`border-b border-mls-card/30 hover:bg-[#1f4e39] cursor-pointer transition-colors group
                ${i < 7 ? 'border-l-4 border-l-mls-accent' : i === 7 ? 'border-t border-t-mls-text/20 border-l-4 border-l-transparent relative' : 'border-l-4 border-l-transparent'}`}
              >
                <td className="px-3 py-3 text-center text-mls-card-hover font-bebas text-base">{row.intRank}</td>
                <td className="px-3 py-3 font-medium flex items-center gap-3">
                  {row.strTeamBadge && <img src={row.strTeamBadge} alt="badge" className="w-5 h-5" />}
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">{row.strTeam}</span>
                  {/* Form hover micro-interaction */}
                  <div className="hidden group-hover:flex items-center gap-1 ml-auto mr-2">
                    {row.strForm?.split('').map((char, index) => (
                      <span key={index} className={`w-2 h-2 rounded-full ${char === 'W' ? 'bg-mls-accent' : char === 'D' ? 'bg-mls-card-hover' : 'bg-[#163627]'}`} title={char}></span>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-3 text-center text-mls-text/80">{row.intPlayed}</td>
                <td className="px-2 py-3 text-center text-mls-text/80">{row.intWin}</td>
                <td className="px-2 py-3 text-center lg:table-cell hidden text-mls-card-hover">{row.intDraw}</td>
                <td className="px-2 py-3 text-center lg:table-cell hidden text-mls-card-hover">{row.intLoss}</td>
                <td className="px-2 py-3 text-center font-bold text-mls-accent">{row.intPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
