import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Breathe from './Breathe';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: 'div',
      button: 'button',
    },
  };
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Breathe Component', () => {
  it('renders the breathing exercises list', () => {
    render(<Breathe />);
    
    expect(screen.getByText('🧘 Breathing Exercises')).toBeInTheDocument();
    expect(screen.getByText('4-7-8 Breathing')).toBeInTheDocument();
    expect(screen.getByText('Box Breathing')).toBeInTheDocument();
  });

  it('selects an exercise and shows the details', () => {
    render(<Breathe />);
    
    // Click on 4-7-8 Relaxing Breath
    fireEvent.click(screen.getByText('4-7-8 Breathing'));
    
    // Check if it transitioned to the exercise view
    expect(screen.getByText('Ready?')).toBeInTheDocument();
    expect(screen.getByText('Cycles:')).toBeInTheDocument();
    // Default cycle is 4 for 4-7-8
    expect(screen.getByText('0/4 cycles')).toBeInTheDocument();
    
    // Check for the audio options
    expect(screen.getByText('No Sound')).toBeInTheDocument();
    expect(screen.getByText('Forest Birds')).toBeInTheDocument();
  });

  it('can select different cycles', () => {
    render(<Breathe />);
    
    fireEvent.click(screen.getByText('4-7-8 Breathing'));
    
    const cycle8Btn = screen.getByText('8', { selector: 'button' });
    fireEvent.click(cycle8Btn);
    
    expect(screen.getByText('0/8 cycles')).toBeInTheDocument();
  });
});
