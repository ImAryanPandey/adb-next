// src/sanity/client.ts
import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy_id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-02-05'; // Lock the API version

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // False for fresh data during dev/pitch
});
