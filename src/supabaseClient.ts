import { createClient } from '@supabase/supabase-js';

declare global {
    interface Window {
        ENV?: {
            VITE_SUPABASE_URL: string;
            VITE_SUPABASE_ANON_KEY: string;
        };
    }
}

// Ensure credentials are read from either import.meta.env or window.ENV (for production config.js)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || window.ENV?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || window.ENV?.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. This may cause connection issues if config.js has not loaded yet.');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to get public URL of an asset from Supabase Storage with a local fallback.
 * @param bucket - Supabase bucket name
 * @param path - File path/name in bucket
 * @param fallback - Local asset path as fallback
 */
export const getAssetUrl = (bucket: string, path: string, fallback: string) => {
    try {
        const cleanPath = path.trim();
        const finalFallback = fallback.startsWith('/') ? fallback : `/${fallback}`;

        if (!supabaseUrl || !cleanPath) return finalFallback;

        // If it's already a full URL, return it
        if (cleanPath.startsWith('http')) return cleanPath;

        const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);
        return data.publicUrl || finalFallback;
    } catch (e) {
        console.error(`Error fetching asset URL for ${path}:`, e);
        return fallback.startsWith('/') ? fallback : `/${fallback}`;
    }
};
