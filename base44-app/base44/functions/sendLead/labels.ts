/**
 * De woorden die de mails nodig hebben, per taal. Een kopie van wat de site
 * zelf toont (src/data/content); src/lib/send-lead-labels.test.ts faalt als
 * die twee uit elkaar lopen.
 */
export const SITE = {
  email: 'scottprins32@gmail.com',
  whatsappDisplay: '+31 20 261 7143',
};

export const LABELS = {
  nl: {
    fields: {
      name: 'Je naam',
      email: 'E-mailadres',
      phone: 'Telefoon',
      company: 'Naam van je zaak',
      trade: 'Branche',
      message: 'Nog iets wat ik moet weten?',
    },
    trades: {
      bakker: 'Bakker',
      kapper: 'Kapper',
      restaurant: 'Restaurant',
      bouw: 'Bouw',
      praktijk: 'Praktijk',
      sport: 'Sport',
      anders: 'Iets anders',
    },
    success: 'Binnen 48 uur hoor je van me. Haast? App me gerust.',
  },
  en: {
    fields: {
      name: 'Your name',
      email: 'Email address',
      phone: 'Phone',
      company: 'Business name',
      trade: 'Trade',
      message: 'Anything else I should know?',
    },
    trades: {
      bakker: 'Bakery',
      kapper: 'Hair salon',
      restaurant: 'Restaurant',
      bouw: 'Builder',
      praktijk: 'Practice',
      sport: 'Gym',
      anders: 'Something else',
    },
    success: 'You’ll hear from me within 48 hours. In a hurry? Just message me.',
  },
} as const;

export const TRADES = ['bakker', 'kapper', 'restaurant', 'bouw', 'praktijk', 'sport'] as const;
