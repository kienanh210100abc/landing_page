import React, { useState, useEffect } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';
import useConfig from 'hooks/useConfig';

// load locales files
const loadLocaleData = (locale: string) => {
    switch (locale) {
        case 'en':
            return import('utils/locales/en.json');

        default:
            return import('utils/locales/vn.json');
    }
};

// ==============================|| LOCALIZATION ||============================== //

interface LocalsProps {
    children: React.ReactNode;
}

const Locales = ({ children }: LocalsProps) => {
    const { locale } = useConfig();
    const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();

    useEffect(() => {
        loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
            setMessages(d.default);
        });
    }, [locale]);

    return (
        <>
            {messages && (
                <IntlProvider locale={locale} defaultLocale="vn" messages={messages}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

export default Locales;
