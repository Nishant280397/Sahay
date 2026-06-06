const translations: Record<string, Record<string, string>> = {
  en: {
    // App
    "app.name": "Sahay",
    "app.tagline": "Your wellness companion during exams",
    
    // Navigation
    "nav.home": "Home",
    "nav.checkin": "Check-In",
    "nav.journal": "Journal",
    "nav.breathe": "Breathe",
    "nav.chat": "Chat with Sahay",
    "nav.history": "History",
    "nav.settings": "Settings",
    "nav.crisis": "Get Help",
    
    // Onboarding
    "onboarding.welcome.title": "Namaste! 🙏",
    "onboarding.welcome.subtitle": "I am Sahay — your wellness companion",
    "onboarding.welcome.description": "During exams, I'm with you. Let's take care of your well-being together.",
    "onboarding.welcome.cta": "Let's Begin",
    "onboarding.welcome.tagline": "Pariksha ke samay, hum hain saath",
    "onboarding.name.title": "What's your name?",
    "onboarding.name.subtitle": "Your name stays on this device only — never shared",
    "onboarding.name.placeholder": "Enter your name",
    "onboarding.exam.title": "Which exam are you preparing for?",
    "onboarding.exam.subtitle": "This helps us personalize your experience",
    "onboarding.exam.attempt": "Which attempt is this?",
    "onboarding.mood.title": "How are you feeling right now?",
    "onboarding.mood.subtitle": "Your first check-in — no judgment, just honesty",
    "onboarding.features.title": "You're all set!",
    "onboarding.features.subtitle": "Here's what Sahay can help you with",
    "onboarding.next": "Next",
    "onboarding.start": "Start Using Sahay",
    "onboarding.skip": "Skip",
    "onboarding.time": "Takes ~2 minutes",
    
    // Home
    "home.greeting.morning": "Good Morning",
    "home.greeting.afternoon": "Good Afternoon",
    "home.greeting.evening": "Good Evening",
    "home.greeting.night": "Good Night",
    "home.checkin.prompt": "How are you feeling today?",
    "home.checkin.done": "Today's check-in done! ✅",
    "home.checkin.cta": "Log your mood",
    "home.streak": "day streak",
    "home.quick_actions": "Quick Actions",
    
    // Mood
    "mood.title": "How are you feeling?",
    "mood.triggers.title": "What caused this?",
    "mood.triggers.subtitle": "Select up to 3 triggers",
    "mood.symptoms.title": "Any physical symptoms?",
    "mood.note.title": "Want to add a note?",
    "mood.note.placeholder": "Write something about how you feel...",
    "mood.saved": "Mood saved! Take care of yourself 💛",
    "mood.already": "You've already checked in today",
    
    // Journal
    "journal.title": "My Journal",
    "journal.new": "New Entry",
    "journal.prompt": "Today's Prompt",
    "journal.placeholder": "Write your thoughts here...",
    "journal.save": "Save Entry",
    "journal.saved": "Entry saved! 📖",
    "journal.empty": "No entries yet. Start writing!",
    "journal.wordcount": "words",
    
    // Breathing
    "breathe.title": "Breathing Exercises",
    "breathe.select": "Choose a technique",
    "breathe.start": "Start",
    "breathe.pause": "Pause",
    "breathe.stop": "Stop",
    "breathe.cycles": "Cycles",
    "breathe.complete": "Great job! You completed the exercise 🧘",
    
    // AI Chat
    "chat.title": "Chat with Sahay",
    "chat.disclaimer": "Sahay is emotional support, not a therapist. Need more help? Call iCall: 9152987821",
    "chat.placeholder": "Type your message...",
    "chat.send": "Send",
    "chat.offline": "You're offline. Sahay will be back when you're connected.",
    "chat.suggested": "Try asking...",
    
    // Crisis
    "crisis.title": "You're Not Alone",
    "crisis.subtitle": "Help is always available — reach out",
    "crisis.banner": "We are here for you 💛",
    "crisis.call": "Call Now",
    "crisis.not_now": "Not Now",
    "crisis.helplines": "Helpline Numbers",
    "crisis.toll_free": "Toll-Free",
    
    // History
    "history.title": "Mood History",
    "history.7days": "7 Days",
    "history.30days": "30 Days",
    "history.insights": "Insights",
    "history.no_data": "Start checking in to see your mood trends!",
    
    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.theme": "Dark Mode",
    "settings.spiritual": "Spiritual Quotes",
    "settings.notifications": "Daily Reminders",
    "settings.reset": "Reset App Data",
    "settings.about": "About Sahay",
    "settings.privacy": "Your data stays on this device",
    
    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.back": "Back",
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
  },
  hi: {
    // App
    "app.name": "साहय",
    "app.tagline": "परीक्षा के समय आपका साथी",
    
    // Navigation
    "nav.home": "घर",
    "nav.checkin": "मूड",
    "nav.journal": "डायरी",
    "nav.breathe": "साँस",
    "nav.chat": "साहय से चैट (Chat with Sahay)",
    "nav.history": "इतिहास",
    "nav.settings": "सेटिंग्स",
    "nav.crisis": "मदद",
    
    // Onboarding
    "onboarding.welcome.title": "नमस्ते! 🙏",
    "onboarding.welcome.subtitle": "मैं साहय हूँ — आपका वेलनेस साथी",
    "onboarding.welcome.description": "परीक्षा के समय, हम हैं साथ। चलो अपने अच्छे स्वास्थ्य का ध्यान रखते हैं।",
    "onboarding.welcome.cta": "शुरू करते हैं",
    "onboarding.welcome.tagline": "परीक्षा के समय, हम हैं साथ",
    "onboarding.name.title": "आपका नाम क्या है?",
    "onboarding.name.subtitle": "आपका नाम सिर्फ इस फ़ोन पर रहेगा",
    "onboarding.name.placeholder": "अपना नाम लिखें",
    "onboarding.exam.title": "किस परीक्षा की तैयारी कर रहे हो?",
    "onboarding.exam.subtitle": "इससे हम आपका अनुभव बेहतर बनाएंगे",
    "onboarding.exam.attempt": "यह कौन सा attempt है?",
    "onboarding.mood.title": "अभी कैसा महसूस हो रहा है?",
    "onboarding.mood.subtitle": "पहला check-in — कोई judgment नहीं",
    "onboarding.features.title": "तैयार हो!",
    "onboarding.features.subtitle": "साहय आपकी इन चीज़ों में मदद करेगा",
    "onboarding.next": "आगे",
    "onboarding.start": "शुरू करो",
    "onboarding.skip": "छोड़ दो",
    "onboarding.time": "~2 मिनट लगेंगे",
    
    // Home
    "home.greeting.morning": "सुप्रभात",
    "home.greeting.afternoon": "नमस्कार",
    "home.greeting.evening": "शुभ संध्या",
    "home.greeting.night": "शुभ रात्रि",
    "home.checkin.prompt": "आज कैसा दिन रहा?",
    "home.checkin.done": "आज का check-in हो गया! ✅",
    "home.checkin.cta": "मूड लॉग करें",
    "home.streak": "दिन की streak",
    "home.quick_actions": "Quick Actions",
    
    // Mood
    "mood.title": "कैसा महसूस हो रहा है?",
    "mood.triggers.title": "इसका कारण क्या था?",
    "mood.triggers.subtitle": "3 तक चुन सकते हो",
    "mood.symptoms.title": "कोई शारीरिक लक्षण?",
    "mood.note.title": "कुछ लिखना चाहोगे?",
    "mood.note.placeholder": "कैसा महसूस हो रहा है लिखो...",
    "mood.saved": "मूड सेव हो गया! अपना ख्याल रखो 💛",
    "mood.already": "आज का check-in पहले ही हो चुका है",
    
    // Journal
    "journal.title": "मेरी डायरी",
    "journal.new": "नई एंट्री",
    "journal.prompt": "आज का सवाल",
    "journal.placeholder": "अपने विचार यहाँ लिखो...",
    "journal.save": "सेव करो",
    "journal.saved": "एंट्री सेव हो गई! 📖",
    "journal.empty": "अभी तक कोई एंट्री नहीं। लिखना शुरू करो!",
    "journal.wordcount": "शब्द",
    
    // Breathing
    "breathe.title": "साँस के व्यायाम",
    "breathe.select": "तकनीक चुनें",
    "breathe.start": "शुरू करो",
    "breathe.pause": "रोको",
    "breathe.stop": "बंद करो",
    "breathe.cycles": "चक्र",
    "breathe.complete": "बहुत अच्छे! व्यायाम पूरा हुआ 🧘",
    
    // AI Chat
    "chat.title": "साहय से चैट (Chat with Sahay)",
    "chat.disclaimer": "साहय emotional support है, therapist नहीं। ज़्यादा मदद चाहिए? iCall: 9152987821",
    "chat.placeholder": "अपना संदेश लिखो...",
    "chat.send": "भेजो",
    "chat.offline": "इंटरनेट नहीं है। साहय वापस आएगा जब connection होगा।",
    "chat.suggested": "पूछ कर देखो...",
    
    // Crisis
    "crisis.title": "तुम अकेले नहीं हो",
    "crisis.subtitle": "मदद हमेशा उपलब्ध है",
    "crisis.banner": "हम यहाँ हैं 💛",
    "crisis.call": "Call करो",
    "crisis.not_now": "अभी नहीं",
    "crisis.helplines": "हेल्पलाइन नंबर",
    "crisis.toll_free": "टोल-फ्री",
    
    // History
    "history.title": "मूड इतिहास",
    "history.7days": "7 दिन",
    "history.30days": "30 दिन",
    "history.insights": "इनसाइट्स",
    "history.no_data": "Check-in शुरू करो अपने mood trends देखने के लिए!",
    
    // Settings
    "settings.title": "सेटिंग्स",
    "settings.language": "भाषा",
    "settings.theme": "डार्क मोड",
    "settings.spiritual": "आध्यात्मिक विचार",
    "settings.notifications": "दैनिक रिमाइंडर",
    "settings.reset": "ऐप डेटा रीसेट करें",
    "settings.about": "साहय के बारे में",
    "settings.privacy": "आपका डेटा इस डिवाइस पर ही रहता है",
    
    // Common
    "common.save": "सेव करो",
    "common.cancel": "रद्द करो",
    "common.close": "बंद करो",
    "common.back": "वापस",
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हो गया",
  },
};

export type Language = 'en' | 'hi';

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}

export default translations;
