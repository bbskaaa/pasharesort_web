import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase, getAssetUrl } from '../supabaseClient'
import LanguageSwitcher from '../components/LanguageSwitcher'
import './Menu.css'

const CATEGORY_PREFIXES = [
    { prefix: 'kahvalti_', icon: '🍳' },
    { prefix: 'meze_', icon: '🥗' },
    { prefix: 'salata_', icon: '🥙' },
    { prefix: 'balik_', icon: '🐟' },
    { prefix: 'izgara_', icon: '🔥' },
    { prefix: 'ana_yemek_', icon: '🍽️' },
    { prefix: 'makarna_', icon: '🍝' },
    { prefix: 'gozleme_', icon: '🫓' },
    { prefix: 'fast_food_', icon: '🍔' },
    { prefix: 'tatli_', icon: '🍮' },
    { prefix: 'icecek_', icon: '🥤' },
    { prefix: 'alkol_', icon: '🍹' },
    { prefix: 'sezlong', icon: '🏖️' },
]

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    description: string;
}

function parsePrices(price: string): string[] {
    return price.split('|').map(p => p.trim()).filter(Boolean)
}

function useDragScroll() {
    const ref = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        const el = ref.current; if (!el) return
        isDragging.current = true
        startX.current = e.pageX - el.offsetLeft
        scrollLeft.current = el.scrollLeft
        el.style.cursor = 'grabbing'
        el.style.userSelect = 'none'
    }, [])

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current || !ref.current) return
        e.preventDefault()
        const x = e.pageX - ref.current.offsetLeft
        ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2
    }, [])

    const stopDrag = useCallback(() => {
        isDragging.current = false
        if (ref.current) { ref.current.style.cursor = ''; ref.current.style.userSelect = '' }
    }, [])

    return { ref, onMouseDown, onMouseMove, onMouseUp: stopDrag, onMouseLeave: stopDrag }
}

export default function Menu() {
    const { t } = useTranslation()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState(CATEGORY_PREFIXES[0].prefix)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const dragScroll = useDragScroll()

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error('Error fetching products:', error);
            else setProducts(data || []);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const activeItems = useMemo(() => {
        return products.filter(item =>
            item.category === activeCategory ||
            (activeCategory === 'fast_food_' && item.category === 'fastfood_')
        );
    }, [products, activeCategory]);

    // Helper to resolve image URL (local vs Supabase storage)
    const getProductImageUrl = (imagePath: string) => {
        if (!imagePath) return '/assets/images/beyaz-transpalent-logo.png';
        if (imagePath.startsWith('http')) return imagePath;

        // Try to get public URL from Supabase first
        try {
            const { data } = supabase.storage.from('menu-images').getPublicUrl(imagePath);
            if (data?.publicUrl) return data.publicUrl;
        } catch (e) {
            console.warn('Supabase image resolution failed, using fallback:', e);
        }

        // Fallback to local path
        return imagePath.startsWith('/') ? imagePath : `/assets/images/menu/${imagePath}`;
    }

    return (
        <div className="menu-page">
            {/* Header */}
            <header className="menu-page__header">
                <Link to="/" className="menu-page__back">{t('backHome')}</Link>
                <img src={getAssetUrl('menu-images', 'assets/images/beyaz-transparent.png', '/assets/images/beyaz-transpalent-logo.png')} alt="Pasha Resort" className="menu-page__logo" />
                <div className="menu-page__header-right">
                    <LanguageSwitcher />
                </div>
            </header>

            {/* Hero */}
            <div className="menu-page__hero">
                <span className="menu-page__eyebrow">RESORT &amp; BEACH CLUB &amp; RESTAURANT</span>
                <h1 className="menu-page__title">{t('menuHeroTitle')}</h1>
                <p className="menu-page__desc">{t('menuHeroDesc')}</p>
            </div>

            {/* Category Tabs */}
            <div
                className="menu-page__tabs-wrapper"
                ref={dragScroll.ref}
                onMouseDown={dragScroll.onMouseDown}
                onMouseMove={dragScroll.onMouseMove}
                onMouseUp={dragScroll.onMouseUp}
                onMouseLeave={dragScroll.onMouseLeave}
            >
                {CATEGORY_PREFIXES.map((cat) => (
                    <button
                        key={cat.prefix}
                        className={`menu-page__tab${activeCategory === cat.prefix ? ' menu-page__tab--active' : ''}`}
                        onClick={() => setActiveCategory(cat.prefix)}
                    >
                        <span className="menu-page__tab-icon">{cat.icon}</span>
                        <span className="menu-page__tab-label">{t(`categories.${cat.prefix}`)}</span>
                    </button>
                ))}
            </div>

            {/* Grid */}
            <main className="menu-page__main">
                {loading ? (
                    <div className="menu-page__loading">Yükleniyor...</div>
                ) : activeItems.length === 0 ? (
                    <p className="menu-page__empty">{t('noItems')}</p>
                ) : (
                    <div className="menu-page__grid">
                        {activeItems.map((item) => {
                            const prices = item.price ? parsePrices(item.price) : []
                            const imgSrc = getProductImageUrl(item.image)
                            return (
                                <div
                                    key={item.id}
                                    className="menu-card"
                                    onClick={() => setSelectedProduct(item)}
                                >
                                    <div className="menu-card__img-wrapper">
                                        <img
                                            src={imgSrc}
                                            alt={item.name}
                                            className="menu-card__img"
                                            loading="lazy"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                // If Supabase path fails or direct path fails, try alternate local folder
                                                if (target.src.includes('djmbiifprjlddjftazaf.supabase.co') || !target.src.includes('/assets/images/')) {
                                                    // Extract filename if nested
                                                    const fileName = item.image.split('/').pop();
                                                    target.src = `/assets/images/menu/${fileName}`;
                                                } else if (!target.src.includes('beyaz-transpalent-logo.png')) {
                                                    target.src = '/assets/images/beyaz-transpalent-logo.png';
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="menu-card__body">
                                        <p className="menu-card__name">{item.name}</p>
                                        {prices.length === 1 && <p className="menu-card__price">{prices[0]}</p>}
                                        {prices.length > 1 && (
                                            <div className="menu-card__prices">
                                                {prices.map((p, i) => <span key={i} className="menu-card__price-row">{p}</span>)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="product-modal" role="dialog" aria-modal="true">
                    <div className="product-modal__overlay" onClick={() => setSelectedProduct(null)} />
                    <div className="product-modal__content">
                        <button
                            className="product-modal__close"
                            onClick={() => setSelectedProduct(null)}
                            aria-label="Kapat"
                        >✕</button>

                        <div className="product-modal__img-wrap">
                            <img
                                src={getProductImageUrl(selectedProduct.image)}
                                alt={selectedProduct.name}
                                className="product-modal__img"
                            />
                        </div>

                        <div className="product-modal__body">
                            <h2 className="product-modal__name">{selectedProduct.name}</h2>
                            <p className="product-modal__desc">{selectedProduct.description}</p>

                            <div className="product-modal__price-wrap">
                                {parsePrices(selectedProduct.price).map((p, i) => (
                                    <span key={i} className="product-modal__price">{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="menu-page__footer"><p>{t('menuFooter')}</p></footer>
        </div>
    )
}
