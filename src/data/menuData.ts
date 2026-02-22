/**
 * Pasha Resort & Beach Club — Menü Verisi
 * Kaynak: product tablosu (SQL)
 *
 * image  → assets/images/menu/ içindeki dosya adı
 * name   → Menüde görünecek ürün adı
 * price  → Fiyat (boş olursa gösterilmez)
 */

export interface MenuItem {
    image: string
    name: string
    price: string
}

export const menuItems: MenuItem[] = [
    // ───────── ALKOLLÜ İÇECEKLER ─────────
    { image: 'alkol_beylerbeyi_gobek_raki.png', name: 'Beylerbeyi Göbek Rakı', price: '100cl: 3200 TL | 70cl: 2400 TL | 50cl: 1800 TL | 35cl: 1300 TL | 20cl: 900 TL' },
    { image: 'alkol_black_label_viski.png', name: 'Johnnie Walker Black Label', price: '100cl: 4200 TL | 70cl: 3200 TL | 50cl: 2500 TL | 35cl: 1800 TL' },
    { image: 'alkol_bomonti_bira.png', name: 'Bomonti Filtresiz', price: '230 TL' },
    { image: 'alkol_bulldog_gin_70.png', name: 'Bulldog Gin 70cl', price: '2800 TL' },
    { image: 'alkol_carlsberg.png', name: 'Carlsberg', price: '220 TL' },
    { image: 'alkol_chivas_regal_viski.png', name: 'Chivas Regal 12 YO', price: '100cl: 4500 TL | 70cl: 3500 TL | 50cl: 2800 TL | 35cl: 2000 TL' },
    { image: 'alkol_corona_bira.png', name: 'Corona Bira', price: '250 TL' },
    { image: 'alkol_double_raki.png', name: 'Double Rakı', price: '450 TL' },
    { image: 'alkol_double_viski.png', name: 'Double Viski', price: '650 TL' },
    { image: 'alkol_efe_gold_raki.png', name: 'Efe Gold Rakı', price: '100cl: 2900 TL | 70cl: 2100 TL | 50cl: 1600 TL | 35cl: 1100 TL' },
    { image: 'alkol_glent_grant_70.png', name: 'Glen Grant 70cl', price: '2600 TL' },
    { image: 'alkol_gordon_gin.png', name: 'Gordon Gin', price: '70cl: 2200 TL | 35cl: 1200 TL' },
    { image: 'alkol_istanblue_vodka.png', name: 'İstanblue Vodka', price: '100cl: 2200 TL | 70cl: 1700 TL | 50cl: 1300 TL | 35cl: 950 TL' },
    { image: 'alkol_kadeh_sarap.png', name: 'Kadeh Şarap', price: '350 TL' },
    { image: 'alkol_olmeca_tekila.png', name: 'Olmeca Tekila', price: '70cl Silver: 2500 TL | 35cl Gold: 1350 TL' },
    { image: 'alkol_tek_raki.png', name: 'Tek Rakı', price: '250 TL' },
    { image: 'alkol_tekirdag_altin_raki.png', name: 'Tekirdağ Altın Seri', price: '100cl: 3000 TL | 70cl: 2200 TL | 50cl: 1700 TL | 35cl: 1200 TL | 20cl: 850 TL' },
    { image: 'alkol_tekirdag_gobek_raki.png', name: 'Tekirdağ Göbek Rakı', price: '100cl: 3200 TL | 70cl: 2400 TL | 50cl: 1800 TL | 35cl: 1300 TL' },
    { image: 'alkol_tuborg.png', name: 'Tuborg Bira', price: '200 TL' },
    { image: 'alkol_yakutdere_sarap.png', name: 'Yakut / Dere Şarap', price: '1800 TL' },
    { image: 'alkol_yeni_raki.png', name: 'Yeni Rakı', price: '100cl: 2800 TL | 70cl: 2000 TL | 50cl: 1500 TL | 35cl: 1000 TL' },

    // ───────── ANA YEMEKLER ─────────
    { image: 'ana_yemek_acisoslutavuk.png', name: 'Acı Soslu Tavuk', price: '480 TL' },
    { image: 'ana_yemek_antrikot.jpg', name: 'Antrikot Izgara', price: '900 TL' },
    { image: 'ana_yemek_cafedeparis_antrikot.png', name: 'Cafe de Paris Antrikot', price: '1.000 TL' },
    { image: 'ana_yemek_citir_manti.png', name: 'Çıtır Mantı', price: '380 TL' },
    { image: 'ana_yemek_et_cokertme.png', name: 'Et Çökertme', price: '700 TL' },
    { image: 'ana_yemek_icli_kofte.png', name: 'İçli Köfte', price: '320 TL' },
    { image: 'ana_yemek_kiremitte_et_kasarli.png', name: 'Kiremitte Kaşarlı Et', price: '750 TL' },
    { image: 'ana_yemek_kiremitte_tavuk_kasarli.webp', name: 'Kiremitte Kaşarlı Tavuk', price: '520 TL' },
    { image: 'ana_yemek_mantarsoslu_tavuk.png', name: 'Mantar Soslu Tavuk', price: '480 TL' },
    { image: 'ana_yemek_manti.png', name: 'Ev Mantısı', price: '350 TL' },
    { image: 'ana_yemek_sac_kavurma.png', name: 'Sac Kavurma', price: '680 TL' },
    { image: 'ana_yemek_sinitzel.png', name: 'Tavuk Şinitzel', price: '450 TL' },

    // ───────── BALIKLAR ─────────
    { image: 'balik_barbun.png', name: 'Barbun Tava', price: '700 TL' },
    { image: 'balik_istavrit.png', name: 'İstavrit Tava', price: '500 TL' },
    { image: 'balik_karides.png', name: 'Tereyağlı Karides', price: '600 TL' },
    { image: 'balik_levrek_buglama.png', name: 'Levrek Buğulama', price: '750 TL' },
    { image: 'balik_levrek_kasarli.png', name: 'Kiremitte Kaşarlı Levrek', price: '800 TL' },
    { image: 'balik_mezgit.png', name: 'Mezgit Tava', price: '650 TL' },
    { image: 'balik_somon_buglama.png', name: 'Somon Buğulama', price: '800 TL' },
    { image: 'balik_somon_kasarli.webp', name: 'Kiremitte Kaşarlı Somon', price: '850 TL' },
    { image: 'balik_zargan.png', name: 'Zargan Tava', price: '550 TL' },

    // ───────── IZGARALAR ─────────
    { image: 'izgara__kuzu.png', name: 'Kuzu Pirzola', price: '850 TL' },
    { image: 'izgara_akcaabat_kofte.png', name: 'Akçaabat Köfte', price: '600 TL' },
    { image: 'izgara_levrek.png', name: 'Levrek Izgara', price: '700 TL' },
    { image: 'izgara_somon.png', name: 'Somon Izgara', price: '800 TL' },
    { image: 'izgara_tavuk.png', name: 'Tavuk Izgara', price: '450 TL' },

    // ───────── FAST FOOD ─────────
    { image: 'fast_food_hamburger.png', name: 'Hamburger Menü', price: '400 TL' },
    { image: 'fast_food_kasarli_tost.png', name: 'Kaşarlı Tost', price: '180 TL' },
    { image: 'fast_food_sandvic.png', name: 'Sandviç Çeşitleri', price: '220 TL' },
    { image: 'fast_food_sucuklu_tost.png', name: 'Sucuklu Tost', price: '200 TL' },
    { image: 'fastfood_french_fries.png', name: 'Patates Kızartması', price: '150 TL' },

    // ───────── GÖZLEME ─────────
    { image: 'gozleme_beyaz_peynir.png', name: 'Gözleme Peynirli', price: '200 TL' },
    { image: 'gozleme_kasarli.png', name: 'Gözleme Kaşarlı', price: '220 TL' },
    { image: 'gozleme_patates.png', name: 'Gözleme Patatesli', price: '210 TL' },

    // ───────── ALKOLSÜZ İÇECEKLER ─────────
    { image: 'icecek_ayran.png', name: 'Ayran', price: '80 TL' },
    { image: 'icecek_cay.png', name: 'Demleme Çay', price: '40 TL' },
    { image: 'icecek_cola.png', name: 'Coca Cola', price: '100 TL' },
    { image: 'icecek_fanta.png', name: 'Fanta / Sprite', price: '100 TL' },
    { image: 'icecek_fuse_tea.png', name: 'Fuse Tea', price: '100 TL' },
    { image: 'icecek_meyveli_soda.png', name: 'Meyveli Soda', price: '80 TL' },
    { image: 'icecek_redbull.png', name: 'Redbull', price: '180 TL' },
    { image: 'icecek_sade_soda.png', name: 'Sade Soda', price: '60 TL' },
    { image: 'icecek_salgam.png', name: 'Şalgam Suyu', price: '80 TL' },
    { image: 'icecek_sprite.png', name: 'Sprite', price: '100 TL' },
    { image: 'icecek_tonik_1.png', name: 'Tonik', price: '100 TL' },
    { image: 'icecek_turk_kahvesi.png', name: 'Türk Kahvesi', price: '100 TL' },

    // ───────── KAHVALTI ─────────
    { image: 'kahvalti_french_fries.png', name: 'Kahvaltı Patatesi', price: '180 TL' },
    { image: 'kahvalti_kuymak.png', name: 'Kuymak', price: '250 TL' },
    { image: 'kahvalti_masa.jpg', name: 'Serpme Kahvaltı (2 Kişilik)', price: '1.200 TL' },
    { image: 'kahvalti_menemen.png', name: 'Menemen', price: '200 TL' },
    { image: 'kahvalti_mix_tabak.png', name: 'Karışık Kahvaltı Tabağı', price: '450 TL' },
    { image: 'kahvalti_omlet_kasarli.png', name: 'Kaşarlı Omlet', price: '220 TL' },
    { image: 'kahvalti_omlet.png', name: 'Sade Omlet', price: '180 TL' },
    { image: 'kahvalti_sigara_boregi.png', name: 'Sigara Böreği', price: '180 TL' },
    { image: 'kahvalti_sogan_halkasi.png', name: 'Soğan Halkası', price: '160 TL' },
    { image: 'kahvalti_sosis.png', name: 'Sosis Tava', price: '240 TL' },
    { image: 'kahvalti_sucuklu_yumurta.png', name: 'Sucuklu Yumurta', price: '280 TL' },
    { image: 'kahvalti_tablot.jpg', name: 'Tabldot Kahvaltı', price: '350 TL' },

    // ───────── MAKARNALAR ─────────
    { image: 'makarna_arabiata.png', name: 'Penne Arrabbiata', price: '350 TL' },
    { image: 'makarna_bolonez.png', name: 'Makarna Bolonez', price: '380 TL' },
    { image: 'makarna_fettucini.png', name: 'Fettucini Alfredo', price: '400 TL' },
    { image: 'makarna_napoliten.png', name: 'Makarna Napoliten', price: '360 TL' },
    { image: 'makarna_penne.png', name: 'Penne Makarna', price: '320 TL' },

    // ───────── MEZELER ─────────
    { image: 'meze_acili_ezme.png', name: 'Acılı Ezme', price: '220 TL' },
    { image: 'meze_arnavut_ciger.png', name: 'Arnavut Ciğeri', price: '350 TL' },
    { image: 'meze_atom.png', name: 'Atom', price: '220 TL' },
    { image: 'meze_deniz_borulcesi.png', name: 'Deniz Börülcesi', price: '220 TL' },
    { image: 'meze_fava.png', name: 'Fava', price: '220 TL' },
    { image: 'meze_haydari.png', name: 'Haydari', price: '220 TL' },
    { image: 'meze_humus.png', name: 'Humus', price: '220 TL' },
    { image: 'meze_karides_marin.png', name: 'Karides Marin', price: '380 TL' },
    { image: 'meze_kopeoglu.png', name: 'Köpoğlu', price: '220 TL' },
    { image: 'meze_kuru_cacik.png', name: 'Kuru Cacık', price: '180 TL' },
    { image: 'meze_levrek_marin.png', name: 'Levrek Marin', price: '380 TL' },
    { image: 'meze_pasa.png', name: 'Paşa Meze Özel', price: '250 TL' },
    { image: 'meze_saksuka.png', name: 'Şakşuka', price: '220 TL' },
    { image: 'meze_sebzeli_mantar.png', name: 'Sebzeli Mantar', price: '240 TL' },
    { image: 'meze_somon_marin.png', name: 'Somon Marin', price: '380 TL' },
    { image: 'meze_tarator.png', name: 'Tarator', price: '220 TL' },
    { image: 'meze_zeytinyagli_fasulye.png', name: 'Zeytinyağlı Fasulye', price: '220 TL' },
    { image: 'meze_zeytinyagli_pilaki.png', name: 'Zeytinyağlı Pilaki', price: '220 TL' },

    // ───────── SALATALAR ─────────
    { image: 'salata_akdeniz.png', name: 'Akdeniz Salata', price: '250 TL' },
    { image: 'salata_coban.png', name: 'Çoban Salata', price: '220 TL' },
    { image: 'salata_karisik.png', name: 'Karışık Mevsim Salata', price: '220 TL' },
    { image: 'salata_mevsim.png', name: 'Mevsim Salata', price: '200 TL' },
    { image: 'salata_sezar.png', name: 'Sezar Salata', price: '300 TL' },
    { image: 'salata_yesil.png', name: 'Yeşil Salata', price: '200 TL' },

    // ───────── PLAJ ─────────
    { image: 'sezlong.png', name: 'Şezlong & Şemsiye', price: '250 TL' },

    // ───────── TATLILAR ─────────
    { image: 'tatli_meyve_tabagi.png', name: 'Mevsim Meyveleri Tabağı', price: '450 TL' },
]

/** Dosya adına göre hızlı arama Map'i */
export const menuByImage = new Map<string, MenuItem>(
    menuItems.map(item => [item.image, item])
)
