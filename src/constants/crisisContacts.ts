export interface CrisisContact {
  name: string;
  number: string;
  description: string;
  hindi: string;
  hours: string;
  type: 'COUNSELING' | 'CRISIS';
  isTollFree?: boolean;
}

export const CRISIS_CONTACTS: CrisisContact[] = [
  {
    name: 'KIRAN',
    number: '1800-599-0019',
    description: 'Government mental health helpline (toll-free)',
    hindi: 'सरकारी मानसिक स्वास्थ्य हेल्पलाइन (निःशुल्क)',
    hours: '24/7',
    type: 'CRISIS',
    isTollFree: true,
  },
  {
    name: 'iCall',
    number: '9152987821',
    description: 'Free counseling by trained professionals',
    hindi: 'प्रशिक्षित पेशेवरों द्वारा मुफ़्त काउंसलिंग',
    hours: 'Mon-Sat, 8am-10pm',
    type: 'COUNSELING',
  },
  {
    name: 'Vandrevala Foundation',
    number: '1860-2662-345',
    description: '24/7 free mental health helpline',
    hindi: '24/7 मुफ़्त मानसिक स्वास्थ्य हेल्पलाइन',
    hours: '24/7',
    type: 'CRISIS',
  },
  {
    name: 'NIMHANS',
    number: '080-46110007',
    description: 'National mental health institute helpline',
    hindi: 'राष्ट्रीय मानसिक स्वास्थ्य संस्थान हेल्पलाइन',
    hours: '24/7',
    type: 'CRISIS',
  },
  {
    name: 'Snehi Foundation',
    number: '044-24640050',
    description: 'Emotional support and suicide prevention',
    hindi: 'भावनात्मक सहारा और आत्महत्या रोकथाम',
    hours: '24/7',
    type: 'CRISIS',
  },
];
