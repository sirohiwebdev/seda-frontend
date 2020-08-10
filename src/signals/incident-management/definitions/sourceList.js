// HERE BE DRAGONS!!!1!
// note that the dashes in the list below aren't '-' characters, but EN dashes
// replacing the characters will affect filtering incidents, because the API does a
// full-string match
const sourceList = [
  { key: 'Melding via webformulier op denhaag.nl', value: 'TMelding via webformulier op denhaag.nl' },
  {
    key: 'Melding via e-mail / contactformulier op de website(Mailbox 14070)',
    value: 'Melding via e-mail / contactformulier op de website(Mailbox 14070)',
  },
  { key: 'Melding via telefoon(14070)', value: 'Melding via telefoon(14070)' },
  { key: 'Melding via chat(14070)', value: 'Melding via chat(14070)' },
  { key: 'Melding via app BuitenBeter', value: 'Melding via app BuitenBeter' },
  { key: 'Melding via app VerbeterDeBuurt', value: 'Melding via app VerbeterDeBuurt' },
  { key: 'Melding via app MyCleanCity', value: 'Melding via app MyCleanCity' },
  { key: 'Melding via Social Media Facebook', value: 'Melding via Social Media Facebook' },
  { key: 'Melding via Social Media Twitter', value: 'Melding via Social Media Twitter' },
  { key: 'Melding via Buurt Interventie Team', value: 'Melding via Buurt Interventie Team' },
  { key: 'Melding via Balie', value: 'Melding via Balie' },
  { key: 'Anderen', value: 'Anderen' },
];

export default sourceList;
