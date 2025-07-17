// @ts-nocheck
'use server';

import { identifyHazardsFromImage, IdentifyHazardsFromImageOutput } from '@/ai/flows/identify-hazards-from-image';

export async function identifyHazardsAction(photoDataUri: string): Promise<IdentifyHazardsFromImageOutput | { error: string }> {
  try {
    if (!photoDataUri) {
      throw new Error("No photo data URI provided.");
    }
    const result = await identifyHazardsFromImage({ photoDataUri });
    return result;
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error };
  }
}
