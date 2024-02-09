import React from 'react';
import './App.css';
import { Matches } from './components/Matches/Matches';

const mockMatches = [
  { homeTeam: 'Germany', awayTeam: 'Poland', homeScore: 0, awayScore: 0 },
  { homeTeam: 'Brazil', awayTeam: 'Mexico', homeScore: 0, awayScore: 0 },
  { homeTeam: 'Argentina', awayTeam: 'Uruguay', homeScore: 0, awayScore: 0 },
];

const App: React.FC = () => {
  return (
    <div className='wrapper'>
      <Matches name='Katar 2023' matches={mockMatches} />
    </div>
  );
};

export default App;
