import { screen, render, fireEvent, act } from '@testing-library/react';
import { Matches } from './Matches';

const mockMatches = [{ homeTeam: 'Aaaaa', awayTeam: 'Bbbbb', homeScore: 0, awayScore: 0 }];

describe('Matches Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('render component with start button', () => {
    render(<Matches name='Test Match' matches={mockMatches} />);
    const startButton = screen.getByText('START');
    expect(startButton).toBeInTheDocument();
  });

  test('render component with finish button after start button click', () => {
    render(<Matches name='Test Match' matches={mockMatches} />);
    const startButton = screen.getByText('START');
    fireEvent.click(startButton);

    const finishButton = screen.getByText('FINISH');
    expect(finishButton).toBeInTheDocument();
  });

  test('render component with restart button after finish button click', () => {
    render(<Matches name='Test Match' matches={mockMatches} />);
    const startButton = screen.getByText('START');
    fireEvent.click(startButton);

    const finishButton = screen.getByText('FINISH');
    fireEvent.click(finishButton);

    const restartButton = screen.getByText('RESTART');
    expect(restartButton).toBeInTheDocument();
  });

  test('reset scores and timer after restart button click', () => {
    render(<Matches name='Test Match' matches={mockMatches} />);
    const startButton = screen.getByText('START');
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(9000);
    });

    const restartButton = screen.getByText('RESTART');
    fireEvent.click(restartButton);

    const score = screen.getByTestId('score-0');
    const timer = screen.getByTestId('timer');

    expect(score.textContent).toBe('0 : 0');
    expect(timer.textContent).toBe('0 min');
  });
});
