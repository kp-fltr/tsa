import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClientProfileDrawer } from '../components/ClientProfileDrawer';
import { clientApi } from '../services/clientApi';

// Mock the client API
vi.mock('../services/clientApi', () => ({
  clientApi: {
    getClientProfile: vi.fn(),
    getClientActivity: vi.fn(),
    updateClientProfile: vi.fn(),
    deleteClient: vi.fn(),
  }
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

const mockClient = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  assessmentStatus: 'Updated' as const,
  sustainabilityAppetite: 'High' as const,
  sustainabilityProfile: 'A' as const,
  latestAssessmentDate: '2024-12-15',
  nextAssessmentDate: '2025-03-15',
  notes: 'Test client notes',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-12-15T00:00:00Z'
};

const mockActivity = [
  {
    id: '1',
    clientId: '1',
    action: 'Profile Updated',
    description: 'Client information updated',
    createdAt: '2024-12-15T10:00:00Z',
    createdBy: 'Test User'
  }
];

describe('ClientProfileDrawer', () => {
  const defaultProps = {
    open: true,
    clientId: '1',
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (clientApi.getClientProfile as any).mockResolvedValue(mockClient);
    (clientApi.getClientActivity as any).mockResolvedValue(mockActivity);
    (clientApi.updateClientProfile as any).mockResolvedValue(true);
  });

  it('renders loading state initially', () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays client data when opened', async () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    
    await waitFor(() => {
      expect(clientApi.getClientProfile).toHaveBeenCalledWith('1');
      expect(clientApi.getClientActivity).toHaveBeenCalledWith('1');
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('enters edit mode when edit button is clicked', async () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('validates form data before saving', async () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Clear the name field (invalid)
    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: '' } });

    // Try to save
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Should not call the API with invalid data
    expect(clientApi.updateClientProfile).not.toHaveBeenCalled();
  });

  it('saves changes when valid data is provided', async () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Update the name
    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    // Save changes
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(clientApi.updateClientProfile).toHaveBeenCalledWith('1', 
        expect.objectContaining({ name: 'Jane Doe' })
      );
    });
  });

  it('cancels edit mode and reverts changes', async () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Change the name
    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: 'Changed Name' } });

    // Cancel
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Should exit edit mode and revert changes
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Changed Name')).not.toBeInTheDocument();
  });

  it('closes drawer when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<ClientProfileDrawer {...defaultProps} onClose={onClose} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Find and click close button (X)
    const closeButton = screen.getByRole('button', { name: /close|×/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('handles ESC key to close drawer', async () => {
    const onClose = vi.fn();
    render(<ClientProfileDrawer {...defaultProps} onClose={onClose} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Press ESC key
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  it('shows confirmation dialog when trying to close with unsaved changes', async () => {
    const originalConfirm = window.confirm;
    window.confirm = vi.fn(() => true);

    const onClose = vi.fn();
    render(<ClientProfileDrawer {...defaultProps} onClose={onClose} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter edit mode and make changes
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: 'Changed Name' } });

    // Try to close
    const closeButton = screen.getByRole('button', { name: /close|×/i });
    fireEvent.click(closeButton);

    expect(window.confirm).toHaveBeenCalledWith(
      'You have unsaved changes. Are you sure you want to close?'
    );
    expect(onClose).toHaveBeenCalled();

    window.confirm = originalConfirm;
  });

  it('displays activity log correctly', async () => {
    render(<ClientProfileDrawer {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('Profile Updated')).toBeInTheDocument();
      expect(screen.getByText('Client information updated')).toBeInTheDocument();
    });
  });
});