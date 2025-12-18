import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AdminSidebar } from './admin-sidebar';

describe('AdminSidebar', () => {
    it('renders sidebar navigation', () => {
        render(<AdminSidebar />);
        expect(screen.getByRole('navigation')).toBeDefined();
        expect(screen.getByText('Dashboard')).toBeDefined();
    });
});
