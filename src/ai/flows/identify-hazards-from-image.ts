'use server';
/**
 * @fileOverview An AI agent that identifies potential hazards in uploaded images.
 *
 * - identifyHazardsFromImage - A function that handles the hazard identification process.
 * - IdentifyHazardsFromImageInput - The input type for the identifyHazardsFromImage function.
 * - IdentifyHazardsFromImageOutput - The return type for the identifyHazardsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyHazardsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a construction site, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyHazardsFromImageInput = z.infer<typeof IdentifyHazardsFromImageInputSchema>;

const IdentifyHazardsFromImageOutputSchema = z.object({
  hazards: z.array(
    z.string().describe('A description of a potential safety hazard identified in the image.')
  ).describe('A list of potential safety hazards identified in the image.')
});
export type IdentifyHazardsFromImageOutput = z.infer<typeof IdentifyHazardsFromImageOutputSchema>;

export async function identifyHazardsFromImage(input: IdentifyHazardsFromImageInput): Promise<IdentifyHazardsFromImageOutput> {
  return identifyHazardsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyHazardsFromImagePrompt',
  input: {schema: IdentifyHazardsFromImageInputSchema},
  output: {schema: IdentifyHazardsFromImageOutputSchema},
  prompt: `You are a safety officer reviewing images from a construction site.
  Identify any potential safety hazards visible in the image and provide a description of each hazard.

  Image: {{media url=photoDataUri}}`,
});

const identifyHazardsFromImageFlow = ai.defineFlow(
  {
    name: 'identifyHazardsFromImageFlow',
    inputSchema: IdentifyHazardsFromImageInputSchema,
    outputSchema: IdentifyHazardsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
