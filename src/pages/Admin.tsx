import React, { useState, useEffect } from 'react';
import { supabase, getAssetUrl } from '../supabaseClient';
import './Admin.css';

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    description: string;
}

const Admin: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Add Product States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', category: 'ana_yemek_', description: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [showToast, setShowToast] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Initial Load
    useEffect(() => {
        if (isLoggedIn) {
            fetchProducts();
        }
    }, [isLoggedIn]);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching products:', error);
        else setProducts(data || []);
        setLoading(false);
    };

    // Handle Login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Secure constant check as requested
        if (credentials.username === 'admin' && credentials.password === 'pasha2026') {
            setIsLoggedIn(true);
        } else {
            alert('Hatalı kullanıcı adı veya şifre!');
        }
    };

    const handlePriceChange = (id: string, newPrice: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, price: newPrice } : p));
    };

    const handleDescriptionChange = (id: string, newDesc: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, description: newDesc } : p));
    };

    // Update Single Product in Cloud
    const handleUpdateProduct = async (product: Product) => {
        const { error } = await supabase
            .from('products')
            .update({
                price: product.price,
                description: product.description
            })
            .eq('id', product.id);

        if (error) {
            console.error('Update failed:', error);
            alert('Güncelleme sırasında hata oluştu.');
        } else {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    // Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Add New Product (with Cloud Storage Upload)
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.name || !selectedFile) return;

        setIsUploading(true);
        try {
            // 1. Upload to Supabase Storage
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('menu-images')
                .upload(filePath, selectedFile);

            if (uploadError) throw uploadError;

            // 2. Insert into Table
            const { error: insertError } = await supabase
                .from('products')
                .insert([{
                    name: newItem.name,
                    price: newItem.price,
                    image: fileName,
                    category: newItem.category,
                    description: newItem.description
                }]);

            if (insertError) throw insertError;

            // Cleanup & Refresh
            setIsAddModalOpen(false);
            setNewItem({ name: '', price: '', category: 'ana_yemek_', description: '' });
            setSelectedFile(null);
            setPreviewUrl('');
            fetchProducts();

            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Add Product Error:', error);
            alert('Ürün eklenirken bir hata oluştu.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteProduct = async (product: Product) => {
        if (!window.confirm(`"${product.name}" ürününü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;

        try {
            // 1. Delete from Storage if it's a Supabase image
            if (product.image && !product.image.startsWith('http')) {
                const { error: storageError } = await supabase.storage
                    .from('menu-images')
                    .remove([product.image]);

                if (storageError) console.warn('Storage cleanup failed:', storageError);
            }

            // 2. Delete from Database
            const { error: dbError } = await supabase
                .from('products')
                .delete()
                .eq('id', product.id);

            if (dbError) throw dbError;

            fetchProducts();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Delete error:', error);
            alert('Silme işlemi başarısız oldu.');
        }
    };

    const getProductImageUrl = (imagePath: string) => {
        if (!imagePath) return '/assets/images/beyaz-transpalent-logo.png';
        if (imagePath.startsWith('http')) return imagePath;

        try {
            const { data } = supabase.storage.from('menu-images').getPublicUrl(imagePath);
            if (data?.publicUrl) return data.publicUrl;
        } catch (e) {
            console.warn('Supabase image resolution failed:', e);
        }

        return imagePath.startsWith('/') ? imagePath : `/assets/images/menu/${imagePath}`;
    }

    const filteredItems = products.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!isLoggedIn) {
        return (
            <div className="admin-login-page">
                <div className="admin-login-card">
                    <img
                        className="admin-login-logo"
                        src={getAssetUrl('menu-images', 'assets/images/beyaz-transparent.png', '/assets/images/beyaz-transpalent-logo.png')}
                        alt="Logo"
                    />
                    <h2>Yönetim Paneli</h2>
                    <form onSubmit={handleLogin}>
                        <div className="admin-input-group">
                            <label>Kullanıcı Adı</label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="admin"
                                required
                            />
                        </div>
                        <div className="admin-input-group">
                            <label>Şifre</label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="admin-login-btn">Giriş Yap</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-header-left">
                    <h1>Ürün Yönetimi</h1>
                    <span className="admin-badge">Cloud Sync Aktif</span>
                </div>
                <div className="admin-header-actions">
                    <button className="admin-save-btn admin-save-btn--idle" onClick={() => window.location.href = '/'}>Siteye Dön</button>
                    <button className="admin-logout-btn" onClick={() => setIsLoggedIn(false)}>Çıkış</button>
                </div>
            </header>

            <div className="admin-main">
                <div className="admin-filters">
                    <div className="admin-filters-left">
                        <input
                            type="text"
                            className="admin-search"
                            placeholder="Ürün Ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="admin-add-trigger" onClick={() => setIsAddModalOpen(true)}>
                        + Yeni Ürün Ekle
                    </button>
                </div>

                <div className="admin-table-container">
                    {loading ? (
                        <div className="admin-loading">Yükleniyor...</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Görsel</th>
                                    <th>Ürün Adı</th>
                                    <th>Kategori</th>
                                    <th>Açıklama</th>
                                    <th>Fiyat (Düzenlenebilir)</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td data-label="Görsel" className="admin-td-img">
                                            <img
                                                src={getProductImageUrl(item.image)}
                                                alt={item.name}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    if (target.src.includes('djmbiifprjlddjftazaf.supabase.co') || !target.src.includes('/assets/images/')) {
                                                        const fileName = item.image.split('/').pop();
                                                        target.src = `/assets/images/menu/${fileName}`;
                                                    } else if (!target.src.includes('beyaz-transpalent-logo.png')) {
                                                        target.src = '/assets/images/beyaz-transpalent-logo.png';
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td data-label="Ürün Adı" className="admin-td-name">{item.name}</td>
                                        <td data-label="Kategori"><span className="admin-category-tag">{item.category.replace('_', ' ')}</span></td>
                                        <td data-label="Açıklama">
                                            <textarea
                                                className="admin-desc-input"
                                                value={item.description || ''}
                                                onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                                                rows={2}
                                            />
                                        </td>
                                        <td data-label="Fiyat">
                                            <input
                                                type="text"
                                                className="admin-price-input"
                                                value={item.price}
                                                onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                            />
                                        </td>
                                        <td data-label="İşlemler" className="admin-td-actions">
                                            <button className="admin-save-row" onClick={() => handleUpdateProduct(item)}>Güncelle</button>
                                            <button className="admin-delete-row" onClick={() => handleDeleteProduct(item)}>Sil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>Yeni Ürün Ekle</h2>
                            <button className="admin-modal-close" onClick={() => setIsAddModalOpen(false)}>&times;</button>
                        </div>
                        <div className="admin-modal-body">
                            <form onSubmit={handleAddProduct} className="admin-add-form">
                                <div className="admin-input-group">
                                    <label>Ürün Adı</label>
                                    <input
                                        type="text"
                                        value={newItem.name}
                                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-input-group">
                                    <label>Fiyat (Örn: 250 TL veya Detaylı Fiyat)</label>
                                    <input
                                        type="text"
                                        value={newItem.price}
                                        onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-input-group">
                                    <label>Ürün Açıklaması</label>
                                    <textarea
                                        value={newItem.description}
                                        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                        placeholder="Üç çeşit zeytin, taze domates, salatalık..."
                                        rows={3}
                                    />
                                </div>
                                <div className="admin-input-group">
                                    <label>Kategori</label>
                                    <select
                                        value={newItem.category}
                                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                        required
                                    >
                                        <option value="kahvalti_">Kahvaltı</option>
                                        <option value="meze_">Mezeler</option>
                                        <option value="salata_">Salatalar</option>
                                        <option value="balik_">Balıklar</option>
                                        <option value="izgara_">Izgara</option>
                                        <option value="ana_yemek_">Ana Yemekler</option>
                                        <option value="makarna_">Makarna</option>
                                        <option value="gozleme_">Gözleme</option>
                                        <option value="fast_food_">Fast Food</option>
                                        <option value="tatli_">Tatlılar</option>
                                        <option value="icecek_">İçecekler</option>
                                        <option value="alkol_">Alkollü</option>
                                        <option value="sezlong">Plaj</option>
                                    </select>
                                </div>

                                <div className="admin-input-group">
                                    <label>Ürün Görseli</label>
                                    <div className="admin-file-wrapper">
                                        <input
                                            type="file"
                                            id="product-image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required
                                        />
                                        <label htmlFor="product-image" className="admin-file-label">
                                            {selectedFile ? selectedFile.name : 'Bilgisayardan Dosya Seç...'}
                                        </label>
                                    </div>

                                    {previewUrl && (
                                        <div className="admin-image-preview">
                                            <img src={previewUrl} alt="Preview" />
                                            <span>Önizleme</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="admin-add-submit"
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Yükleniyor...' : 'Ürünü Buluta Kaydet'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showToast && <div className="admin-toast">Başarıyla Kaydedildi!</div>}
        </div>
    );
};

export default Admin;
