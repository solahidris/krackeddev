import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// @ts-ignore - Component not implemented yet
import { BountyForm } from './bounty-form';

describe('BountyForm', () => {
    it('should render all fields', () => {
        render(<BountyForm onSubmit={vi.fn()} />);

        expect(screen.getByLabelText(/title/i)).toBeTruthy();
        expect(screen.getByLabelText(/slug/i)).toBeTruthy();
        expect(screen.getByLabelText(/reward/i)).toBeTruthy();
        expect(screen.getByLabelText(/type/i)).toBeTruthy();
        expect(screen.getByLabelText('Short Description')).toBeDefined();
    });

    it('should show validation errors on submit with empty fields', async () => {
        const handleSubmit = vi.fn();
        render(<BountyForm onSubmit={handleSubmit} />);

        const submitBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            // Title is required
            expect(screen.getByText(/title is required/i)).toBeTruthy();
        });

        expect(handleSubmit).not.toHaveBeenCalled();
    });
});
