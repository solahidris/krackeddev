import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database, UserRole } from '@/types/database';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // IMPORTANT: Do not write any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protect /admin routes - redirect to home if not authenticated or not admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

        // Check if user is admin by querying profiles
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const role = (profile as { role: UserRole } | null)?.role;
        if (role !== 'admin') {
            const url = request.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    // Redirect to onboarding if user is authenticated but hasn't completed onboarding
    // Skip for auth routes, onboarding routes, and API routes only
    // Redirect to onboarding if user is authenticated but hasn't completed onboarding
    // Skip for auth routes, onboarding routes, and API routes only
    const isExempt =
        request.nextUrl.pathname.startsWith('/auth') ||
        request.nextUrl.pathname.startsWith('/onboarding') ||
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname.startsWith('/banned');

    if (user && !isExempt) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed, status')
            .eq('id', user.id)
            .single();

        const userProfile = profile as { onboarding_completed: boolean; status: string } | null;

        // Check for ban status first
        if (userProfile?.status === 'banned') {
            const url = request.nextUrl.clone();
            url.pathname = '/banned';
            return NextResponse.redirect(url);
        }

        // Check for onboarding completion
        if (userProfile && !userProfile.onboarding_completed) {
            const url = request.nextUrl.clone();
            url.pathname = '/onboarding/form';
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}

