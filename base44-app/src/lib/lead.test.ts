import { describe, expect, it } from 'vitest';
import { leadSummary, validateLead, type LeadLabels } from './lead';

const labels: LeadLabels = {
  name: 'Naam',
  email: 'E-mail',
  phone: 'Telefoon',
  company: 'Zaak',
  trade: 'Branche',
  message: 'Bericht',
  trades: {
    bakker: 'Bakker',
    kapper: 'Kapper',
    restaurant: 'Restaurant',
    bouw: 'Bouw',
    praktijk: 'Praktijk',
    sport: 'Sport',
    anders: 'Iets anders',
  },
};

describe('validateLead', () => {
  it('accepteert een complete bon', () => {
    const result = validateLead({
      name: '  Fatima  ',
      email: 'fatima@voorbeeld.nl',
      company: 'Studio Noor',
      trade: 'kapper',
      locale: 'en',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.name).toBe('Fatima');
      expect(result.lead.trade).toBe('kapper');
      expect(result.lead.locale).toBe('en');
    }
  });

  it('wil een naam en een geldig e-mailadres', () => {
    const result = validateLead({ name: '', email: 'geen-mail' });
    expect(result).toEqual({ ok: false, fields: ['name', 'email'] });
  });

  it('valt terug op veilige waarden bij rommel', () => {
    const result = validateLead({ name: 'Bas', email: 'bas@test.nl', trade: 'hacker', locale: 'de', phone: 42 });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.trade).toBe('anders');
      expect(result.lead.locale).toBe('nl');
      expect(result.lead.phone).toBe('');
    }
  });

  it('kapt te lange velden af', () => {
    const result = validateLead({ name: 'x'.repeat(500), email: 'a@b.nl', message: 'y'.repeat(5000) });
    expect(result.ok && result.lead.name.length).toBe(100);
    expect(result.ok && result.lead.message.length).toBe(2000);
  });

  it('accepteert geen niet-object', () => {
    expect(validateLead(null).ok).toBe(false);
    expect(validateLead('hallo').ok).toBe(false);
  });
});

describe('leadSummary', () => {
  it('laat lege velden weg en zet het bericht onderaan', () => {
    const result = validateLead({ name: 'Bas', email: 'bas@test.nl', trade: 'bouw', message: 'Graag snel.' });
    if (!result.ok) throw new Error('ongeldig');
    expect(leadSummary(result.lead, labels)).toBe(
      'Naam: Bas\nBranche: Bouw\nE-mail: bas@test.nl\n\nBericht:\nGraag snel.',
    );
  });
});
