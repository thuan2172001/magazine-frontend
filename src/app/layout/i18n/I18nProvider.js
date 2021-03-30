import React from 'react';
import {useLang} from './Metronici18n';
import {IntlProvider} from 'react-intl';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

import viMessages from './messages/vi.json';
import enMessages from './messages/en.json';

export const allMessages = {
  en: enMessages,
  vi: viMessages,
};

export function I18nProvider({children}) {
  const locale = useLang();
  const messages = allMessages[locale];
  
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
