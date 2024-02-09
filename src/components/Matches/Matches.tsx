import React, { useEffect, useState } from 'react';
import './Matches.css';
import { Button } from '../Button/Button';

type TimerType = 'start' | 'running' | 'finished';

interface MatchProps {
  name: string;
  matches: {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
  }[];
}

const INTERVAL = 1000;
const DURATION = 9000;

export const Matches: React.FC<MatchProps> = ({ name, matches }) => {
  const [timerStatus, setTimerStatus] = useState<TimerType>('start');
  const [time, setTime] = useState(0);

  const handleStart = () => {
    setTimerStatus('running');
  };

  const handleRestart = () => {
    matches.forEach((match) => {
      match.homeScore = 0;
      match.awayScore = 0;
    });
    setTime(0);
    setTimerStatus('running');
  };

  const handleFinish = () => {
    setTimerStatus('finished');
  };

  const totalScoreCounter = () => {
    let counter = 0;
    matches.forEach((match) => {
      counter += match.homeScore + match.awayScore;
    });
    return counter;
  };

  const getRandomTeam = () => {
    const randomIndex = Math.floor(Math.random() * matches.length);
    const homeAwayScore = Math.floor(Math.random() * 2);
    if (homeAwayScore === 0) {
      matches[randomIndex].homeScore += 1;
    } else {
      matches[randomIndex].awayScore += 1;
    }
    setTime((prev) => prev + 10);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerStatus === 'running') {
      interval = setInterval(() => {
        getRandomTeam();
      }, INTERVAL);
    }
    return () => clearInterval(interval);
  }, [timerStatus]);

  useEffect(() => {
    if (timerStatus === 'running') {
      const timeout = setTimeout(() => {
        handleFinish();
      }, DURATION);

      return () => clearTimeout(timeout);
    }
  }, [timerStatus]);

  const renderButtons = () => {
    switch (timerStatus) {
      case 'start':
        return <Button state={'start'} handleClick={handleStart} />;
      case 'running':
        return <Button state={'finish'} handleClick={handleFinish} />;
      case 'finished':
        return <Button state={'restart'} handleClick={handleRestart} />;
      default:
        return <Button state={'restart'} handleClick={handleRestart} />;
    }
  };

  return (
    <div className='card'>
      <h2>{name}</h2>
      {renderButtons()}
      <div className='info' data-testid={'timer'}>
        <strong>{time}</strong> min
      </div>
      <ul className='matchList'>
        {matches.map((match, index) => (
          <li key={index}>
            <div className='match'>
              <div>
                <span className='space'>
                  {match.homeTeam} vs {match.awayTeam}
                </span>
              </div>
              <div>
                <span className='space' data-testid={`score-${index}`}>
                  {match.homeScore} : {match.awayScore}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className='info'>
        Total goals: <strong>{totalScoreCounter()}</strong>
      </p>
    </div>
  );
};
