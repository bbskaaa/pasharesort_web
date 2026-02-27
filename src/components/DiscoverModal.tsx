import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { getAssetUrl } from '../supabaseClient'
import LanguageSwitcher from './LanguageSwitcher'
import './DiscoverModal.css'

interface Props { onClose: () => void }

const VIDEOS = [
    { src: getAssetUrl('videos', 'story1.mp4', '/assets/videos/pasha-sahil.mp4'), captionKey: 'modal.cap1' },
    { src: getAssetUrl('videos', 'story2.mp4', '/assets/videos/tanitim.mp4'), captionKey: 'modal.cap2' },
    { src: getAssetUrl('videos', 'story3.mp4', '/assets/videos/sila-kurt.mp4'), captionKey: 'modal.cap3' },
    { src: getAssetUrl('videos', 'story4.mp4', '/assets/videos/romantik-masa.mp4'), captionKey: 'modal.cap4' },
    { src: getAssetUrl('videos', 'story5.mp4', '/assets/videos/dugun-organizasyon.mp4'), captionKey: 'modal.cap5' },
]

export default function DiscoverModal({ onClose }: Props) {
    const { t } = useTranslation()
    const overlayRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [activeIdx, setActiveIdx] = useState(0)

    /* Close on ESC, lock body scroll */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = '' }
    }, [onClose])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose()
    }

    /* Scroll to card by index */
    const goTo = useCallback((idx: number) => {
        const clamped = Math.max(0, Math.min(VIDEOS.length - 1, idx))
        setActiveIdx(clamped)
        const track = trackRef.current
        if (!track) return
        const card = track.children[clamped] as HTMLElement
        if (!card) return
        // Center the active card within the track
        const trackCenter = track.scrollLeft + track.clientWidth / 2
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        track.scrollBy({ left: cardCenter - trackCenter, behavior: 'smooth' })
    }, [])

    /* Update active dot on scroll */
    useEffect(() => {
        const track = trackRef.current
        if (!track) return
        const handleScroll = () => {
            const cards = Array.from(track.children) as HTMLElement[]
            const trackCenter = track.scrollLeft + track.clientWidth / 2
            let closest = 0
            let minDist = Infinity
            cards.forEach((c, i) => {
                const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - trackCenter)
                if (dist < minDist) { minDist = dist; closest = i }
            })
            setActiveIdx(closest)
        }
        track.addEventListener('scroll', handleScroll, { passive: true })
        return () => track.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            className="dm__overlay"
            ref={overlayRef}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div className="dm__panel">

                {/* Header */}
                <div className="dm__header">
                    <img src={getAssetUrl('menu-images', 'assets/images/beyaz-transparent.png', '/assets/images/beyaz-transpalent-logo.png')} alt="Pasha Resort" className="dm__logo" />
                    <div className="dm__header-actions">
                        <LanguageSwitcher />
                        <button className="dm__close" onClick={onClose} aria-label="Kapat">✕</button>
                    </div>
                </div>

                {/* Scrollable body */}
                <div className="dm__body">

                    {/* ── 9:16 Story Slider ── */}
                    <div className="dm__slider-wrap">
                        <div className="dm__slider-track" ref={trackRef}>
                            {VIDEOS.map((v, i) => (
                                <div
                                    key={v.src}
                                    className={`dm__story-card${i === activeIdx ? ' dm__story-card--active' : ''}`}
                                    onClick={() => goTo(i)}
                                >
                                    <div className="dm__video-frame">
                                        <video
                                            className="dm__video"
                                            src={v.src}
                                            autoPlay={i === activeIdx}
                                            muted
                                            playsInline
                                            onEnded={() => {
                                                if (i === activeIdx && activeIdx < VIDEOS.length - 1) {
                                                    goTo(activeIdx + 1);
                                                }
                                            }}
                                            ref={(el) => {
                                                if (el) {
                                                    if (i === activeIdx) el.play().catch(() => { });
                                                    else { el.pause(); el.currentTime = 0; }
                                                }
                                            }}
                                            onError={(e) => {
                                                const target = e.target as HTMLVideoElement;
                                                if (target.src.includes('djmbiifprjlddjftazaf.supabase.co')) {
                                                    const fileName = v.src.split('/').pop()?.split('?')[0];
                                                    const localMap: Record<string, string> = {
                                                        'story1.mp4': '/assets/videos/pasha-sahil.mp4',
                                                        'story2.mp4': '/assets/videos/tanitim.mp4',
                                                        'story3.mp4': '/assets/videos/sila-kurt.mp4',
                                                        'story4.mp4': '/assets/videos/romantik-masa.mp4',
                                                        'story5.mp4': '/assets/videos/dugun-organizasyon.mp4'
                                                    };
                                                    if (fileName && localMap[fileName]) {
                                                        target.src = localMap[fileName];
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <p className="dm__video-caption">{t(v.captionKey)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Arrow nav */}
                        <button
                            className="dm__arrow dm__arrow--prev"
                            onClick={() => goTo(activeIdx - 1)}
                            disabled={activeIdx === 0}
                            aria-label="Önceki"
                        >‹</button>
                        <button
                            className="dm__arrow dm__arrow--next"
                            onClick={() => goTo(activeIdx + 1)}
                            disabled={activeIdx === VIDEOS.length - 1}
                            aria-label="Sonraki"
                        >›</button>

                        {/* Dots */}
                        <div className="dm__dots">
                            {VIDEOS.map((_, i) => (
                                <button
                                    key={i}
                                    className={`dm__dot${i === activeIdx ? ' dm__dot--active' : ''}`}
                                    onClick={() => goTo(i)}
                                    aria-label={`Video ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Story text ── */}
                    <div className="dm__text-section">
                        <h2 className="dm__headline">{t('modal.headline')}</h2>
                        <p className="dm__para">{t('modal.para1')}</p>
                        <p className="dm__para">{t('modal.para2')}</p>
                        <p className="dm__para">{t('modal.para3')}</p>
                    </div>

                    {/* ── CTA ── */}
                    <div className="dm__cta-wrap">
                        <a
                            href="https://www.reseliva.com/booknow/Pasha-Resort-Beach-Club/?lang=tr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dm__cta"
                        >
                            {t('modal.cta')}
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
