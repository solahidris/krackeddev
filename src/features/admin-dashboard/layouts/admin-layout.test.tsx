import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AdminLayout } from './admin-layout';

describe('AdminLayout', () => {
    it('renders sidebar and children', () => {
        render(
            <AdminLayout>
                <div>Child Content</div>
            </AdminLayout>
        );
        expect(screen.getByRole('navigation')).toBeDefined(); // Sidebar
        expect(screen.getByText('Child Content')).toBeDefined(); // Children
    });
});
