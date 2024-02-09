import { screen, render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('render button with correct text', () => {
    render(<Button state='start' handleClick={() => {}} />);
    const button = screen.getByText('START');
    expect(button).toBeInTheDocument();
  });

  test('calls handleClick on button click', () => {
    const handleClickMock = jest.fn();
    render(<Button state='start' handleClick={handleClickMock} />);
    const button = screen.getByText('START');
    fireEvent.click(button);
    expect(handleClickMock).toHaveBeenCalled();
  });
});
