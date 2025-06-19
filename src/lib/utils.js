import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from './supabaseClient'; // adjust the path to your Supabase client if needed

/**
 * Utility to merge Tailwind class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Fetches visit data between two dates and returns the average visits per record
 * @param {string} start - ISO date string for the start of the range
 * @param {string} end - ISO date string for the end of the range
 * @returns {Promise<number>} average visits
 */
export async function getAverageVisits(start, end) {
  // Query Supabase for all records in the given date range
  const { data, error } = await supabase
    .from('traffic')
    .select('visits, created_at')
    .gte('created_at', start)
    .lte('created_at', end);

  if (error) {
    console.error('Error fetching visits:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return 0;
  }

  // Sum up all visits and compute average
  const total = data.reduce((sum, row) => sum + (row.visits || 0), 0);
  return total / data.length;
}