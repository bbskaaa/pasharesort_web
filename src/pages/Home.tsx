import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase, getAssetUrl } from '../supabaseClient'
import LanguageSwitcher from '../components/LanguageSwitcher'
import DiscoverModal from '../components/DiscoverModal'
import './Home.css'

function Home() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="home">
            {/* Fullscreen video background */}
            <div className="home__video-container">
                <video
                    className="home__video"
                    src={getAssetUrl('videos', 'hero-bg.mp4', '/assets/videos/arkaplan.mp4')}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="home__overlay" />
            </div>

            {/* Language switcher — fixed top right */}
            <LanguageSwitcher />

            {/* Content layer */}
            <div className="home__content">
                {/* Logo */}
                <div className="home__logo-wrapper">
                    <img
                        className="home__logo"
                        src={getAssetUrl('menu-images', 'logo.png', '/assets/images/beyaz-transpalent-logo.png')}
                        alt="Pasha Resort & Beach Club"
                    />
                </div>

                {/* Tagline */}
                <div className="home__tagline">
                    <p className="home__tagline-main">
                        {t('slogan').split('\n').map((line, i) => (
                            <span key={i}>{line}{i === 0 && <br />}</span>
                        ))}
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="home__cta-group">
                    <button
                        className="home__btn home__btn--primary"
                        onClick={() =>
                            window.open(
                                'https://www.reseliva.com/booknow/Pasha-Resort-Beach-Club/?lang=tr',
                                '_blank',
                                'noopener,noreferrer'
                            )
                        }
                    >
                        {t('reserveBtn')}
                    </button>
                    <button
                        className="home__btn home__btn--secondary"
                        onClick={() => navigate('/menu')}
                    >
                        {t('menuBtn')}
                    </button>
                    <button
                        className="home__btn home__btn--ghost"
                        onClick={() => setShowModal(true)}
                    >
                        {t('discoverBtn')}
                    </button>
                </div>
            </div>

            {/* Discover Modal */}
            {showModal && <DiscoverModal onClose={() => setShowModal(false)} />}
        </div>
    )
}

export default Home

