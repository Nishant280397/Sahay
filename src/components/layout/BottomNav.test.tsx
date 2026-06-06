import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useUIStore } from '../../store/uiStore';

describe('BottomNav Component', () => {
  beforeEach(() => {
    useUIStore.setState({ language: 'en' });
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders all navigation items', () => {
    renderWithRouter(<BottomNav />);
    
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Check-In')).toBeInTheDocument();
    expect(screen.getByLabelText('Journal')).toBeInTheDocument();
    expect(screen.getByLabelText('Breathe')).toBeInTheDocument();
    expect(screen.getByLabelText('Chat with Sahay')).toBeInTheDocument();
  });

  it('renders Hindi labels when language is changed', () => {
    useUIStore.setState({ language: 'hi' });
    renderWithRouter(<BottomNav />);
    
    // Check if aria-labels are updated
    expect(screen.getByLabelText('घर')).toBeInTheDocument();
    expect(screen.getByLabelText('मूड')).toBeInTheDocument();
  });
});
