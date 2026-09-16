import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, ExternalLink } from 'lucide-react';

export interface SocialLinksProps {
  variant?: 'header' | 'footer' | 'contact-card' | 'inline';
  showLabels?: boolean;
}

export const ETHIOBEST_CONTACT_INFO = {
  phone: '+251 959 15 55 55',
  phoneClean: '+251959155555',
  whatsappClean: '251959155555',
  email: 'ethiobestestate@gmail.com',
  address: 'EthioBest Business Center, Bole, Addis Ababa',
  hoursWeekday: 'Monday–Saturday 09:30–20:00',
  hoursSunday: 'Sunday 14:00–20:00',
  googleMapsUrl: 'https://maps.app.goo.gl/NCyRVk4y7noVoy1x7',
  wazeUrl: 'https://waze.com/ul?q=EthioBest+Business+Center+Bole+Addis+Ababa',
  whatsappUrl: 'https://wa.me/251959155555',
  telegramUrl: 'https://t.me/+251959155555',
  facebookUrl: 'https://www.facebook.com',
  smsUrl: 'sms:+251959155555'
};

export const AWLO_CONTACT_INFO = ETHIOBEST_CONTACT_INFO;

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'footer',
}) => {
  const links = [
    {
      name: 'WhatsApp',
      href: AWLO_CONTACT_INFO.whatsappUrl,
      title: 'Chat on WhatsApp (+251 959 15 55 55)',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.18 8.18 0 01-5.82 2.41c-1.45 0-2.88-.38-4.14-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.17 8.17 0 01-1.25-4.43c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.05 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
        </svg>
      )
    },
    {
      name: 'Telegram',
      href: AWLO_CONTACT_INFO.telegramUrl,
      title: 'Telegram Direct Chat (+251 959 15 55 55)',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.17 3.35-1.37 3.73-1.38.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
        </svg>
      )
    },
    {
      name: 'Email',
      href: `mailto:${AWLO_CONTACT_INFO.email}`,
      title: 'Send Email',
      icon: <Mail className="w-4 h-4" />
    },
    {
      name: 'Directions',
      href: AWLO_CONTACT_INFO.googleMapsUrl,
      title: 'Directions on Google Maps',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      )
    }
  ];

  if (variant === 'header') {
    return (
      <div className="flex items-center gap-1.5 text-slate-300">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-colors"
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
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-800 hover:bg-blue-600 text-white text-xs font-medium transition-colors border border-slate-700"
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
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors border border-slate-700"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

/**
 * Reach Us Directly Cards
 * Styled strictly according to requirements:
 * "Each contact method shown as its own rounded card with a colored icon:
 *  - phone = blue
 *  - WhatsApp = green
 *  - Telegram = light blue
 *  - email = red/pink
 *  - office = purple
 *  White/very light rounded cards with soft shadows, icon in small rounded square,
 *  bold heading, gray description text, thin divider line at bottom."
 */
export const ReachUsDirectlyCards: React.FC<{ onActionClick?: () => void }> = () => {
  const contactMethods = [
    {
      id: 'phone',
      label: 'Direct Phone',
      value: AWLO_CONTACT_INFO.phone,
      subtext: 'Call our sales desk directly',
      href: `tel:${AWLO_CONTACT_INFO.phoneClean}`,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      icon: <Phone className="w-5 h-5 text-blue-600" />,
      actionText: 'Call Now'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: AWLO_CONTACT_INFO.phone,
      subtext: 'Instant floor plans & video tours',
      href: AWLO_CONTACT_INFO.whatsappUrl,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      icon: (
        <svg className="w-5 h-5 text-emerald-600 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.18 8.18 0 01-5.82 2.41c-1.45 0-2.88-.38-4.14-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.17 8.17 0 01-1.25-4.43c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.05 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
        </svg>
      ),
      actionText: 'Open Chat'
    },
    {
      id: 'telegram',
      label: 'Telegram',
      value: AWLO_CONTACT_INFO.phone,
      subtext: 'Direct property inquiry channel',
      href: AWLO_CONTACT_INFO.telegramUrl,
      iconBg: 'bg-sky-50 text-sky-500 border border-sky-100',
      icon: (
        <svg className="w-5 h-5 text-sky-500 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.17 3.35-1.37 3.73-1.38.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
        </svg>
      ),
      actionText: 'Message Us'
    },
    {
      id: 'email',
      label: 'Email',
      value: AWLO_CONTACT_INFO.email,
      subtext: 'Formal proposals & agreements',
      href: `mailto:${AWLO_CONTACT_INFO.email}`,
      iconBg: 'bg-rose-50 text-rose-500 border border-rose-100',
      icon: <Mail className="w-5 h-5 text-rose-500" />,
      actionText: 'Send Email'
    },
    {
      id: 'office',
      label: 'Main Office',
      value: AWLO_CONTACT_INFO.address,
      subtext: 'Mon–Sat 09:30–20:00, Sun 14:00–20:00',
      href: AWLO_CONTACT_INFO.googleMapsUrl,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
      icon: <MapPin className="w-5 h-5 text-purple-600" />,
      actionText: 'Get Directions'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
      {contactMethods.map((method) => (
        <a
          key={method.id}
          href={method.href}
          target={method.href.startsWith('http') ? '_blank' : undefined}
          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            {/* Icon in small rounded square */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${method.iconBg}`}>
              {method.icon}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {method.label}
              </span>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5 break-words">
                {method.value}
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {method.subtext}
            </p>
          </div>

          {/* Thin divider line at the bottom of each card */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>{method.actionText}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </a>
      ))}
    </div>
  );
};
