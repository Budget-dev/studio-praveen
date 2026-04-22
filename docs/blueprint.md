# **App Name**: Patnala Gruhapravesam

## Core Features:

- Bilingual Language Selection: Present a full-screen language selection on first load for English or Telugu, storing preference locally and allowing dynamic toggling via a visible icon.
- Interactive Invitation Reveal: Display a beautiful landing card with family names and auspicious text, featuring an animated 'Open Invitation' reveal to the main content.
- Detailed Event Presentation: Showcase Gruhapravesam and Vratham details in clear, interactive cards, including date, time, and venue, with options to add to calendar (.ics download) and link to Google Maps for directions.
- Guest Wishbook with Firestore: Enable guests to submit personalized wishes through a form, securely storing them in Firebase Firestore, and displaying a real-time, scrollable list of wishes.
- Aesthetic Enhancements & Animations: Incorporate CSS keyframe animations for floating flower petals and subtle section fade-ins, complemented by decorative floral motifs, kolam-inspired patterns, and traditional symbols to enhance visual elegance.
- Optimized Display & Sharing: Ensure full mobile responsiveness across devices, generate dynamic meta tags for SEO and social sharing, and provide a direct WhatsApp share button for easy sharing.
- Seamless Navigation & User Comfort: Integrate a brief loading splash screen, a 'scroll to top' button for improved navigation on long pages, and robust error handling for external data sources like the wishbook.

## Style Guidelines:

- Primary background color: A warm, elegant ivory (#FAF7F2) serves as the base for a bright, inviting theme, echoing traditional paper invitations, setting a light color scheme.
- Primary accent color: A deep, rich maroon (#7B3045) is chosen for key buttons, titles, and decorative text. This color, deeply rooted in traditional South Indian auspicious tones, provides strong contrast and a celebratory feel.
- Secondary accent color: An antique gold (#C49A5A) highlights decorative flourishes, dividers, and subtle elements, adding a touch of traditional luxury, warmth, and festive sparkle.
- Text colors: A very dark warm brown (#2C2015) is used for main headings and body text, while a medium warm brown (#7A6A52) serves for muted elements. This combination ensures high readability and complements the overall warm, earthy palette.
- Neutral card background: Crisp white (#FFFFFF) provides clean, distinct backdrops for content cards such as event details and guest wishes, ensuring clarity and focus.
- Telugu text: 'Tiro Telugu' (serif), chosen for its traditional elegance and excellent readability for the Telugu script, aligning with cultural authenticity.
- English headings: 'Cormorant Garamond' (serif), providing a refined and high-end aesthetic, suitable for the ceremonial nature of the invitation.
- English body text: 'Lato' (sans-serif), selected for its clean lines, neutrality, and clear legibility, balancing traditional aesthetics with modern design principles.
- Decorative script: 'Great Vibes' (script), used for prominent names and special mentions to infuse a personalized, artistic, and celebratory flair. Note: currently only Google Fonts are supported.
- Auspicious symbols: Incorporate Unicode Om/Ganesha symbol (🕉), Kalash emoji, and custom SVG floral/lotus motifs for borders and accents, drawing inspiration from rich South Indian artistry and cultural heritage.
- Functional icons: Employ clear emojis (🏠, 🪔, 📍) or Heroicons for event details and user actions, maintaining a minimal yet intuitive and culturally sensitive interface.
- Background patterns: Integrate subtle, barely visible kolam/rangoli watermark patterns using CSS radial-gradient or SVG to enhance the traditional and textured aesthetic of the site background.
- Splash & Cover: An initial full-screen language selection interface precedes an elegant, centered cover card for the main invitation reveal, designed to create a dramatic and engaging user entrance.
- Content structure: All main sections feature center-aligned content with generous padding, clearly separated by elegant gold horizontal dividers, promoting visual hierarchy and ease of reading.
- Responsive Grids: Event detail cards adapt dynamically from a 3-column layout on desktop to a vertical stack on mobile, and wish cards adjust from 1 to 2 columns, ensuring optimal readability and aesthetics across all screen sizes.
- Persistent UI: A fixed language toggle in the top-right corner and a 'scroll to top' button for convenient navigation are always available, enhancing user control and accessibility throughout the site.
- Entrance & Reveals: Smooth, sophisticated animations for the 'Open Invitation' card transition and staggered fade-ins for content sections upon scrolling, creating a fluid and engaging user journey.
- Thematic effects: Delicate floating flower petals animated via CSS keyframes in the hero section provide a whimsical and festive atmosphere, embodying the celebratory nature of the event.
- Interactive feedback: Subtle `transform: scale` and `box-shadow` changes on card hovers, loading spinners for form submissions, and clear toast notifications for user actions enhance interactivity and provide immediate feedback.
- Pre-load experience: A brief, full-screen spinning lotus animation displayed on the initial page load offers an engaging wait time, setting an aesthetic tone before the main content appears.