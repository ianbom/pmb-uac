import { createContext, useContext, useEffect, useState } from 'react';
import { fonts } from '@/admin/config/fonts';
import { getCookie, setCookie, removeCookie } from '@/admin/lib/cookies';

type Font = (typeof fonts)[number];

const FONT_COOKIE_NAME = 'font';
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type FontContextType = {
    font: Font;
    setFont: (font: Font) => void;
    resetFont: () => void;
};

const FontContext = createContext<FontContextType | null>(null);

export function FontProvider({ children }: { children: React.ReactNode }) {
    const [font, _setFont] = useState<Font>(fonts[0]);
    useEffect(() => {
        const saved = getCookie(FONT_COOKIE_NAME);
        if (fonts.includes(saved as Font)) _setFont(saved as Font);
    }, []);

    useEffect(() => {
        document.documentElement.dataset.adminFont = font;
        return () => {
            delete document.documentElement.dataset.adminFont;
        };
    }, [font]);

    const setFont = (font: Font) => {
        setCookie(FONT_COOKIE_NAME, font, FONT_COOKIE_MAX_AGE);
        _setFont(font);
    };

    const resetFont = () => {
        removeCookie(FONT_COOKIE_NAME);
        _setFont(fonts[0]);
    };

    return (
        <FontContext value={{ font, setFont, resetFont }}>
            {children}
        </FontContext>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error('useFont must be used within a FontProvider');
    }
    return context;
};
