'use server';
/**
 * @fileOverview A Genkit flow to generate personalized thank-you notes for housewarming guests.
 *
 * - generatePersonalizedThankYouNote - A function that handles the thank-you note generation process.
 * - GeneratePersonalizedThankYouNoteInput - The input type for the generatePersonalizedThankYouNote function.
 * - GeneratePersonalizedThankYouNoteOutput - The return type for the generatePersonalizedThankYouNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedThankYouNoteInputSchema = z.object({
  name: z.string().describe("The name of the guest for whom the thank-you note is being generated."),
  wishMessage: z.string().describe("The wish message submitted by the guest."),
});
export type GeneratePersonalizedThankYouNoteInput = z.infer<typeof GeneratePersonalizedThankYouNoteInputSchema>;

const GeneratePersonalizedThankYouNoteOutputSchema = z.object({
  thankYouNote: z.string().describe("The personalized thank-you note for the guest."),
});
export type GeneratePersonalizedThankYouNoteOutput = z.infer<typeof GeneratePersonalizedThankYouNoteOutputSchema>;

export async function generatePersonalizedThankYouNote(input: GeneratePersonalizedThankYouNoteInput): Promise<GeneratePersonalizedThankYouNoteOutput> {
  return generatePersonalizedThankYouNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedThankYouNotePrompt',
  input: {schema: GeneratePersonalizedThankYouNoteInputSchema},
  output: {schema: GeneratePersonalizedThankYouNoteOutputSchema},
  prompt: `You are a warm and grateful host generating personalized thank-you notes for guests who attended a housewarming (Gruhapravesam) ceremony.

Guest's Name: {{{name}}}
Guest's Wish: {{{wishMessage}}}

Write a polite, warm, and personalized thank-you note for the guest, acknowledging their specific wish and thanking them for their presence at the housewarming. Keep the note concise, around 2-3 sentences, and ensure it sounds genuinely appreciative.`,
});

const generatePersonalizedThankYouNoteFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedThankYouNoteFlow',
    inputSchema: GeneratePersonalizedThankYouNoteInputSchema,
    outputSchema: GeneratePersonalizedThankYouNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
