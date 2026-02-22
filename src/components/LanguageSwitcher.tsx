import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const current = i18n.language?.startsWith('en') ? 'en' : 'tr'

    const toggle = (lang: string) => {
        i18n.changeLanguage(lang)
        localStorage.setItem('pasha_lang', lang)
    }

    return (
        <div className="lang-switcher">
            <button
                className={`lang-switcher__btn${current === 'tr' ? ' lang-switcher__btn--active' : ''}`}
                onClick={() => toggle('tr')}
                aria-label="Türkçe"
            >
                TR
            </button>
            <span className="lang-switcher__divider">|</span>
            <button
                className={`lang-switcher__btn${current === 'en' ? ' lang-switcher__btn--active' : ''}`}
                onClick={() => toggle('en')}
                aria-label="English"
            >
                EN
            </button>
        </div>
    )
}
