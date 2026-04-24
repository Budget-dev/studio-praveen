'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedThankYouNoteInputSchema = z.object({
  name: z.string().describe("The name of the guest."),
  wishMessage: z.string().describe("The wish message submitted by the guest."),
});
export type GeneratePersonalizedThankYouNoteInput = z.infer<typeof GeneratePersonalizedThankYouNoteInputSchema>;

const GeneratePersonalizedThankYouNoteOutputSchema = z.object({
  thankYouNote: z.string().describe("The personalized thank-you note."),
});
export type GeneratePersonalizedThankYouNoteOutput = z.infer<typeof GeneratePersonalizedThankYouNoteOutputSchema>;

const thankYouPrompt = ai.definePrompt({
  name: 'generatePersonalizedThankYouNotePrompt',
  input: {schema: GeneratePersonalizedThankYouNoteInputSchema},
  output: {schema: GeneratePersonalizedThankYouNoteOutputSchema},
  prompt: `You are a warm host for a housewarming (Gruhapravesam) ceremony for the Patnala family.
  Guest Name: {{{name}}}
  Guest Wish: {{{wishMessage}}}
  Write a beautiful, 2-sentence thank you note that sounds like it came from the family heart. Be grateful and reference their wish warmly.`,
});

export async function generatePersonalizedThankYouNote(input: GeneratePersonalizedThankYouNoteInput): Promise<GeneratePersonalizedThankYouNoteOutput> {
  const {output} = await thankYouPrompt(input);
  return output!;
}
