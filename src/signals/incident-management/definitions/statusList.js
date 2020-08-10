/*New
Pending treatment
In the case of the party
Scheduled
Handled
Rejected
More information desired
Reopened
Split"

*/
const NEW = {
  key: 'n',
  value: 'New',
  color: 'blue',
};

const PENDING_TREATMENT = {
  key: 'p',
  value: 'Pending Treatment',
  color: 'yellow',
};
const IN_CASE_OF_THE_TREATMENT = {
  key: 'i',
  value: 'In the case of the party',
  color: 'grey',
};

const SCHEDULED = {
  key: 's',
  value: 'Scheduled',
  color: 'orange',
};

const HANDLED = {
  key: 'h',
  value: 'Handled',
  color: 'green',
};

const REJECTED = {
  key: 'r',
  value: 'Rejected',
  color: 'red',
};

const MORE_INFORMATION_DESIRED = {
  key: 'm',
  value: 'More information desired',
  color: 'purple',
};

const REOPENED = {
  key: 'o',
  value: 'Reopened',
  color: 'brown',
};

const SPLIT = {
  key: 't',
  value: 'Split',
  color: 'black',
};

const statusList = [
  NEW,
  REJECTED,
  SCHEDULED,
  REOPENED,
  MORE_INFORMATION_DESIRED,
  IN_CASE_OF_THE_TREATMENT,
  SPLIT,
  PENDING_TREATMENT,
];
export default statusList;

export const defaultTextsOptionList = [
  NEW,
  REJECTED,
  SCHEDULED,
  REOPENED,
  MORE_INFORMATION_DESIRED,
  IN_CASE_OF_THE_TREATMENT,
  SPLIT,
  PENDING_TREATMENT,
];

/*

const GEMELD = {
  key: 'm',
  value: 'Gemeld',
  color: 'red',
};
const AFWACHTING = {
  key: 'i',
  value: 'In afwachting van behandeling',
  warning: 'De melder ontvangt deze toelichting niet.',
  color: 'purple',
};
const BEHANDELING = {
  key: 'b',
  value: 'In behandeling',
  warning: 'De melder ontvangt deze toelichting niet, maar kan die wel opvragen door te bellen.',
  color: 'blue',
};
const AFGEHANDELD = {
  key: 'o',
  value: 'Afgehandeld',
  warning:
    'De melder ontvangt deze toelichting per e-mail, let dus op de schrijfstijl. De e-mail bevat al een aanhef en afsluiting. Verwijs nooit naar een andere afdeling; hercategoriseer dan de melding. Gebruik deze status alleen als de melding ook echt is afgehandeld, gebruik anders de status Ingepland. Let op: als de huidige status “Verzoek tot heropenen” is, dan wordt er geen e-mail naar de melder gestuurd.',
  color: 'lightgreen',
};
const GESPLITST = {
  key: 's',
  value: 'Gesplitst',
  color: 'lightgreen',
};
const INGEPLAND = {
  key: 'ingepland',
  value: 'Ingepland',
  warning:
    'De melder ontvangt deze toelichting per e-mail, let dus op de schrijfstijl. De e-mail bevat al een aanhef en afsluiting.',
  color: 'grey',
};
const GEANNULEERD = {
  key: 'a',
  value: 'Geannuleerd',
  warning:
    'Bij deze status wordt de melding afgesloten en er wordt GEEN bericht naar de melder gestuurd. Gebruik deze status alleen voor test- en nepmeldingen of meldingen van veelmelders.',
  color: 'darkgrey',
};

const VERZOEK_TOT_HEROPENEN = {
  key: 'reopen requested',
  value: 'Verzoek tot heropenen',
  color: 'orange',
};

const HEROPEND = {
  key: 'reopened',
  value: 'Heropend',
  warning:
    'De melder ontvangt deze toelichting per e-mail, let dus op de schrijfstijl. De e-mail bevat al een aanhef en afsluiting. Verwijs nooit naar een andere afdeling; hercategoriseer dan de melding.',
  color: 'orange',
};
const TE_VERZENDEN = {
  key: 'ready to send',
  value: 'Extern: te verzenden',
};
const VERZONDEN = {
  key: 'sent',
  value: 'Extern: verzonden',
};
const VERZENDEN_MISLUKT = {
  key: 'send failed',
  value: 'Extern: mislukt',
};
const VERZOEK_TOT_AFHANDELING = {
  key: 'closure requested',
  value: 'Extern: verzoek tot afhandeling',
  warning: 'De melder ontvangt deze toelichting niet, maar kan die wel opvragen door te bellen.',
};
const AFGEHANDELD_EXTERN = {
  key: 'done external',
  value: 'Extern: afgehandeld',
};

const statusList = [
  GEMELD,
  AFWACHTING,
  BEHANDELING,
  AFGEHANDELD,
  INGEPLAND,
  GEANNULEERD,
  GESPLITST,
  VERZOEK_TOT_HEROPENEN,
  HEROPEND,
  TE_VERZENDEN,
  VERZONDEN,
  VERZENDEN_MISLUKT,
  VERZOEK_TOT_AFHANDELING,
  AFGEHANDELD_EXTERN,
];

export default statusList;

export const changeStatusOptionList = [
  GEMELD,
  AFWACHTING,
  INGEPLAND,
  BEHANDELING,
  VERZOEK_TOT_AFHANDELING,
  AFGEHANDELD,
  HEROPEND,
  GEANNULEERD,
];

export const defaultTextsOptionList = [AFGEHANDELD, INGEPLAND, HEROPEND];

*/
