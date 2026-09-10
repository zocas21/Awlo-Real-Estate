import React from 'react';

export interface SocialLinksProps {
  variant?: 'header' | 'footer' | 'contact-card' | 'inline';
  showLabels?: boolean;
}

export const AWLO_CONTACT_INFO = {
  phone: '+251 92 941 9130',
  phoneClean: '+251929419130',
  email: 'awlobc@gmail.com',
  address: 'Bole Sub-city, In front of Bole Medhanialem Church, Next to Kenenisa Hotel, Addis Ababa, Ethiopia',
  hoursWeekday: 'Monday–Saturday 09:30–20:00',
  hoursSunday: 'Sunday 14:00–20:00',
  googleMapsUrl: 'https://maps.google.com/?q=Bole+Medhanialem+Church+Kenenisa+Hotel+Addis+Ababa+Ethiopia',
  wazeUrl: 'https://waze.com/ul?q=Bole+Medhanialem+Church+Addis+Ababa',
  whatsappUrl: 'https://wa.me/251929419130',
  telegramUrl: 'https://t.me/awlobc',
  facebookUrl: 'https://www.facebook.com',
  smsUrl: 'sms:+251929419130'
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'footer',
  showLabels = false
}) => {
  const links = [
    {
      name: 'WhatsApp',
      href: AWLO_CONTACT_INFO.whatsappUrl,
      title: 'Chat on WhatsApp (+251 92 941 9130)',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.18 8.18 0 01-5.82 2.41c-1.45 0-2.88-.38-4.14-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.17 8.17 0 01-1.25-4.43c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.05 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
        </svg>
      )
    },
    {
      name: 'Telegram',
      href: AWLO_CONTACT_INFO.telegramUrl,
      title: 'Telegram Channel / Direct Chat',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.17 3.35-1.37 3.73-1.38.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: AWLO_CONTACT_INFO.facebookUrl,
      title: 'Facebook Page',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: 'SMS',
      href: AWLO_CONTACT_INFO.smsUrl,
      title: 'Send SMS (+251 92 941 9130)',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01" />
          <path d="M12 10h.01" />
          <path d="M16 10h.01" />
        </svg>
      )
    },
    {
      name: 'Maps',
      href: AWLO_CONTACT_INFO.googleMapsUrl,
      title: 'Directions on Google Maps',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      )
    },
    {
      name: 'Waze',
      href: AWLO_CONTACT_INFO.wazeUrl,
      title: 'Directions on Waze',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    }
  ];

  if (variant === 'header') {
    return (
      <div className="flex items-center gap-1.5 text-emerald-100">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className="w-6 h-6 rounded flex items-center justify-center text-emerald-200 hover:text-amber-300 hover:bg-emerald-800/40 transition-colors"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'contact-card') {
    return (
      <div className="flex flex-wrap gap-2 pt-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/60 hover:bg-amber-400 hover:text-slate-900 text-emerald-100 text-xs font-semibold transition-colors border border-emerald-800/50"
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    );
  }

  // Default: Footer style
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.title}
          className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-amber-400 hover:text-slate-900 text-emerald-200 flex items-center justify-center transition-colors border border-emerald-800/60"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};
