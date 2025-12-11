"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "ms";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Simple dictionary for MVP
  // In a real app, this would be in separate JSON files
  const translations: Record<string, Record<Language, string>> = {
    // Nav
    "nav.home": { en: "Home", ms: "Utama" },
    "nav.talks": { en: "Community Talks", ms: "Bicara Komuniti" },
    "nav.hackathon": { en: "Hackathon", ms: "Hackathon" },
    "nav.prayer": { en: "Next Prayer (KL):", ms: "Solat Seterusnya (KL):" },

    // Hero
    "hero.title": {
      en: "Be a 100x Kracked Dev",
      ms: "Jadilah Kracked Dev 100x",
    },
    "hero.subtitle": {
      en: "A community of cracked developers who want to level up together.",
      ms: "Komuniti pembangun hebat yang ingin maju bersama.",
    },
    "hero.cta_join": { en: "Join Community", ms: "Sertai Komuniti" },
    "hero.cta_explore": { en: "Explore Bootcamps", ms: "Lihat Bootcamp" },

    // Bootcamp
    "bootcamp.title": { en: "Vibe Code Bootcamp", ms: "Vibe Code Bootcamp" },
    "bootcamp.desc": {
      en: "Turn random vibes into real output in 28 days. No CS degree, just cracked execution.",
      ms: "Tukar idea random jadi output sebenar dalam 28 hari. Tak perlu degree CS, cuma execution yang padu.",
    },
    "bootcamp.price": { en: "RM 999 / 28 days", ms: "RM 999 / 28 hari" },
    "bootcamp.feature1": {
      en: "Real-world projects",
      ms: "Projek dunia sebenar",
    },
    "bootcamp.feature2": {
      en: "Mentorship from industry leaders",
      ms: "Mentorship dari pakar industri",
    },
    "bootcamp.feature3": {
      en: 'Earn "Cracked Dev" status',
      ms: 'Dapatkan status "Cracked Dev"',
    },

    // Talks
    "talks.title": { en: "Community Talks", ms: "Bicara Komuniti" },
    "talks.subtitle": {
      en: "Hear from key figures in the industry.",
      ms: "Dengar daripada tokoh industri.",
    },
    "talks.card_title": { en: "Vibe Code & Value", ms: "Vibe Code & Nilai" },
    "talks.card_desc": {
      en: "How non-coders can produce value with code.",
      ms: "Bagaimana bukan pengekod boleh mencipta nilai dengan kod.",
    },
    "talks.topic1": {
      en: "Math & Engineering",
      ms: "Matematik & Kejuruteraan",
    },
    "talks.topic2": { en: "Automation", ms: "Automasi" },
    "talks.topic3": { en: "Business Value", ms: "Nilai Perniagaan" },
    "talks.speaker1_role": { en: "Senior Engineer", ms: "Jurutera Kanan" },
    "talks.speaker2_role": { en: "Tech Lead", ms: "Ketua Teknikal" },
    "talks.speaker3_role": { en: "Founder", ms: "Pengasas" },

    // Hackathon
    "hackathon.title": { en: "Kracked Hackathon", ms: "Kracked Hackathon" },
    "hackathon.desc": {
      en: "Go crazy. Win AI credits.",
      ms: "Serlahkan bakat. Menangi kredit AI.",
    },
    "hackathon.prize": {
      en: "Grand Prize: RM 1,200 in AI Credits",
      ms: "Hadiah Utama: RM 1,200 Kredit AI",
    },
    "hackathon.leaderboard": { en: "Leaderboard", ms: "Papan Pendahulu" },
    "hackathon.points": { en: "Points", ms: "Mata" },
    "hackathon.bug_bounty": {
      en: "Bug Bounty Integrated",
      ms: "Integrasi Bug Bounty",
    },
    "hackathon.rules": {
      en: "First winner gets sponsored credits. Increase likelihood of getting hired.",
      ms: "Pemenang utama dapat kredit tajaan. Tingkatkan peluang dapat kerja.",
    },

    // Join Community
    "join.title": {
      en: "Join the Kracked Dev Community",
      ms: "Sertai Komuniti Kracked Dev",
    },
    "join.subtitle": {
      en: "Connect with other developers and level up together.",
      ms: "Berhubung dengan pembangun lain dan maju bersama.",
    },
    "join.form_title": {
      en: "Join Community Form",
      ms: "Borang Sertai Komuniti",
    },
    "join.name_label": { en: "Full Name", ms: "Nama Penuh" },
    "join.name_placeholder": {
      en: "Enter your full name",
      ms: "Masukkan nama penuh anda",
    },
    "join.email_label": { en: "Email Address", ms: "Alamat E-mel" },
    "join.email_placeholder": {
      en: "your.email@example.com",
      ms: "e-mel.anda@contoh.com",
    },
    "join.background_label": { en: "Experience Level", ms: "Tahap Pengalaman" },
    "join.background_placeholder": {
      en: "Select your experience level",
      ms: "Pilih tahap pengalaman anda",
    },
    "join.background_beginner": { en: "Beginner", ms: "Pemula" },
    "join.background_intermediate": { en: "Intermediate", ms: "Pertengahan" },
    "join.background_advanced": { en: "Advanced", ms: "Lanjutan" },
    "join.background_professional": { en: "Professional", ms: "Profesional" },
    "join.submit_button": { en: "Join Community", ms: "Sertai Komuniti" },
    "join.benefits_title": {
      en: "What You'll Get",
      ms: "Apa Yang Anda Akan Dapat",
    },
    "join.benefit1": {
      en: "Access to exclusive Discord community with 500+ developers",
      ms: "Akses ke komuniti Discord eksklusif dengan 500+ pembangun",
    },
    "join.benefit2": {
      en: "Weekly community talks and networking events",
      ms: "Bicara komuniti mingguan dan acara rangkaian",
    },
    "join.benefit3": {
      en: "Share projects and get feedback from peers",
      ms: "Kongsi projek dan dapatkan maklum balas daripada rakan",
    },
    "join.benefit4": {
      en: "Early access to bootcamps and hackathons",
      ms: "Akses awal ke bootcamp dan hackathon",
    },
    "join.success_title": {
      en: "Welcome to the Community!",
      ms: "Selamat Datang ke Komuniti!",
    },
    "join.success_subtitle": {
      en: "You're now part of the Kracked Dev community.",
      ms: "Anda kini sebahagian daripada komuniti Kracked Dev.",
    },
    "join.success_message": {
      en: "Thank you for joining!",
      ms: "Terima kasih kerana menyertai!",
    },
    "join.success_details": {
      en: "We'll send you a welcome email with next steps and community access details.",
      ms: "Kami akan menghantar e-mel selamat datang dengan langkah seterusnya dan butiran akses komuniti.",
    },

    // Footer
    "footer.copyright": {
      en: "© 2024 Kracked Devs. All rights reserved.",
      ms: "© 2024 Kracked Devs. Hak cipta terpelihara.",
    },
  };

  const t = (key: string) => {
    const entry = translations[key];
    return entry ? entry[language] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
