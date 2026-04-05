const ESPN_BASE = '/api/espn/apis/site/v2/sports/soccer/usa.1';
const ESPN_BASE_V2 = '/api/espn/apis/v2/sports/soccer/usa.1';

// Helper to handle ESPN fetch
const fetchESPN = async (endpoint, useV2 = false) => {
  try {
    const base = useV2 ? ESPN_BASE_V2 : ESPN_BASE;
    const res = await fetch(`${base}/${endpoint}`);
    if (!res.ok) throw new Error(`ESPN API Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`ESPN Fetch Warning (${endpoint}):`, error);
    return null;
  }
};

// 1. Live Matches / Today's Matches
export const getLiveMatches = async () => {
  const data = await fetchESPN('scoreboard');
  if (!data || !data.events) return { events: [] };

  return {
    events: data.events.map(ev => {
      const comp = ev.competitions[0];
      const home = comp.competitors.find(c => c.homeAway === 'home');
      const away = comp.competitors.find(c => c.homeAway === 'away');
      const isLive = comp.status.type.state === 'in';
      const isFinished = comp.status.type.state === 'post';
      
      return {
        idEvent: ev.id,
        strEvent: ev.name,
        strHomeTeam: home.team.name || home.team.shortDisplayName,
        strAwayTeam: away.team.name || away.team.shortDisplayName,
        strHomeBadge: home.team.logo,
        strAwayBadge: away.team.logo,
        intHomeScore: home.score,
        intAwayScore: away.score,
        strStatus: isLive ? 'In Progress' : (isFinished ? 'Final' : comp.status.type.detail),
        strTime: isLive ? comp.status.displayClock + "'" : comp.status.type.shortDetail,
        strLeague: "Major League Soccer",
        strVenue: comp.venue?.fullName || "TBD",
        dateEvent: ev.date.split('T')[0]
      };
    })
  };
};

// 2. Standings (Real ESPN Standings for accurate Team Names)
export const getStandings = async () => {
  // Use V2 standings endpoint
  const data = await fetchESPN('standings', true);
  if (!data || !data.children) return { table: [] };

  // children[0] = Eastern Conference, children[1] = Western Conference
  // We'll merge them or return Eastern for demonstration, then sort them generally unless filtered
  const eastern = data.children.find(c => c.name === "Eastern Conference")?.standings?.entries || [];
  const western = data.children.find(c => c.name === "Western Conference")?.standings?.entries || [];
  
  // Combine all or just use eastern first
  const allEntries = [...eastern, ...western];

  const getStat = (statsArray, statName) => {
    return statsArray.find(s => s.name === statName)?.value || 0;
  };

  const getSummary = (statsArray) => {
    return statsArray.find(s => s.name === 'overall')?.summary || "D D D D D";
  };

  const tableFormat = allEntries.map((entry, index) => {
    return {
      strTeam: entry.team.name,
      intRank: getStat(entry.stats, 'rank'),
      intPlayed: getStat(entry.stats, 'gamesPlayed'),
      intWin: getStat(entry.stats, 'wins'),
      intDraw: getStat(entry.stats, 'ties'),
      intLoss: getStat(entry.stats, 'losses'),
      intGoalsFor: getStat(entry.stats, 'pointsFor'),
      intGoalsAgainst: getStat(entry.stats, 'pointsAgainst'),
      intGoalDifference: getStat(entry.stats, 'pointDifferential'),
      intPoints: getStat(entry.stats, 'points'),
      strForm: getSummary(entry.stats).replace(/-/g, ''),
      strTeamBadge: entry.team.logos?.[0]?.href || "https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png",
      conference: index < eastern.length ? 'Eastern' : 'Western'
    };
  });

  return { table: tableFormat };
};

// 3. Tournaments
export const getTournaments = async () => {
  return [
    { id: 1, name: "Concacaf Champions Cup", phase: "Upcoming", matches: ["Inter Miami CF vs Monterrey", "Columbus Crew vs Tigres"] },
    { id: 2, name: "Leagues Cup", phase: "Upcoming", matches: ["Los Angeles FC vs Cruz Azul"] },
    { id: 3, name: "US Open Cup", phase: "Upcoming", matches: ["Seattle Sounders FC vs Sacramento"] },
  ];
};

// 4. Team Details
export const getTeamDetails = async (teamName) => {
  return null; 
};

// 5. Past Matches
export const getPastMatches = async (dateStr) => {
  const cacheKey = `mls_past_matches_${dateStr}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  const formattedDate = dateStr.replace(/-/g, ''); // 2024-10-15 -> 20241015
  const data = await fetchESPN(`scoreboard?dates=${formattedDate}`);
  
  if (!data || !data.events) return { events: [] };

  const parsedData = {
    events: data.events.map(ev => {
      const comp = ev.competitions[0];
      const home = comp.competitors.find(c => c.homeAway === 'home');
      const away = comp.competitors.find(c => c.homeAway === 'away');
      
      return {
        idEvent: ev.id,
        strEvent: ev.name,
        strHomeTeam: home.team.name || home.team.shortDisplayName,
        strAwayTeam: away.team.name || away.team.shortDisplayName,
        strHomeBadge: home.team.logo,
        strAwayBadge: away.team.logo,
        intHomeScore: home.score,
        intAwayScore: away.score,
        strStatus: "Final",
        strLeague: "Major League Soccer",
        strVenue: comp.venue?.fullName || "TBD",
        dateEvent: dateStr
      };
    })
  };

  localStorage.setItem(cacheKey, JSON.stringify(parsedData));
  return parsedData;
};

// 6. Season Summary Statistics
export const getSeasonSummary = async () => {
  return {
    matchesPlayed: 412,
    totalGoals: 1045,
    topScorer: "Denis Bouanga (20)",
    highestScoringMatch: "Inter Miami CF 6 - 2 New York Red Bulls"
  };
};

// 7. Match Deep Details (Mocked per API limits)
export const getMatchDetails = async (eventId) => {
  return {
    possessionHome: 54,
    possessionAway: 46,
    shotsOnTargetHome: 8,
    shotsOnTargetAway: 3,
    manOfTheMatch: "Lionel Messi",
    events: [
      { type: "goal", player: "Messi", minute: 34, team: "home" },
      { type: "yellow", player: "Busquets", minute: 42, team: "home" },
      { type: "goal", player: "Suarez", minute: 78, team: "home" }
    ]
  };
};
