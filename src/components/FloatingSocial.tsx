import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import './FloatingSocial.css'

function FloatingSocial() {
    return (
        <div className="floating-social">
            <a
                href="https://wa.me/905315248183"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social__btn floating-social__btn--whatsapp"
                aria-label="WhatsApp ile İletişim"
            >
                <FaWhatsapp />
            </a>
            <a
                href="https://www.instagram.com/pasharesort/"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-social__btn floating-social__btn--instagram"
                aria-label="Instagram Sayfamız"
            >
                <FaInstagram />
            </a>
        </div>
    )
}

export default FloatingSocial
