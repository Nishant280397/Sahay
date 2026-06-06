import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUIStore } from './uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useUIStore.setState({
      language: 'en',
      isDarkMode: false,
      activeModal: null,
      toastMessage: null,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with default state', () => {
    const state = useUIStore.getState();
    expect(state.language).toBe('en');
    expect(state.isDarkMode).toBe(false);
    expect(state.activeModal).toBeNull();
    expect(state.toastMessage).toBeNull();
  });

  it('should toggle dark mode', () => {
    const { toggleDarkMode } = useUIStore.getState();
    
    toggleDarkMode();
    expect(useUIStore.getState().isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    toggleDarkMode();
    expect(useUIStore.getState().isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should change language', () => {
    const { setLanguage } = useUIStore.getState();
    setLanguage('hi');
    expect(useUIStore.getState().language).toBe('hi');
  });

  it('should show and hide modals', () => {
    const { showModal, hideModal } = useUIStore.getState();
    
    showModal('settings');
    expect(useUIStore.getState().activeModal).toBe('settings');
    
    hideModal();
    expect(useUIStore.getState().activeModal).toBeNull();
  });

  it('should show toast and hide it after timeout', () => {
    const { showToast } = useUIStore.getState();
    
    showToast('Hello world');
    expect(useUIStore.getState().toastMessage).toBe('Hello world');
    
    // Fast forward time
    vi.advanceTimersByTime(3000);
    expect(useUIStore.getState().toastMessage).toBeNull();
  });
});
