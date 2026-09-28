/**
 * The offerte form's fields — the server's allow-list. `POST /api/submit-form`
 * only mails keys listed here, whatever the browser posted, so a field added
 * to `OfferteForm` must be added here too.
 */
export type OfferteField = {
  name: string;
  /** Label in the notification mail. */
  label: string;
  type?: 'email';
  isRequired?: boolean;
};

export const OFFERTE_FORM_ID = 'offerte';

export const OFFERTE_FIELDS: OfferteField[] = [
  { name: 'requesterType', label: 'Aanvrager' },
  { name: 'name', label: 'Naam', isRequired: true },
  { name: 'phone', label: 'Telefoonnummer' },
  { name: 'email', label: 'E-mailadres', type: 'email', isRequired: true },
  { name: 'vveName', label: 'VvE / complex' },
  { name: 'surface', label: 'Geschatte oppervlakte' },
  { name: 'company', label: 'Bedrijfsnaam' },
  { name: 'location', label: 'Locatie project' },
  { name: 'service', label: 'Waar gaat het om' },
  { name: 'message', label: 'Omschrijving' },
  // Filled in by the form itself: which page the request came from.
  { name: 'page', label: 'Verstuurd vanaf' },
];

export const SERVICE_OPTIONS = [
  'Sierbestrating',
  'Schuttingbouw',
  'Tuinaanleg',
  'Terrasreiniging',
  'Groter zakelijk project',
];
