import { FacebookFilled, InstagramOutlined } from '@ant-design/icons';
import EscudoMich from '../assets/images/EscudoMich.png';

const currentYear = new Date().getFullYear();

const XSocialIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="app-footer__social-svg"
  >
    <path
      fill="currentColor"
      d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.94 6.07-6.94Zm-1.29 19.49h2.04L6.49 3.26H4.3Z"
    />
  </svg>
);

const AppFooter = () => (
  <footer className="app-footer">
    <div className="app-footer__inner">
      <div className="app-footer__top">
        <div className="app-footer__identity">
          <img
            src={EscudoMich}
            alt="Escudo Michoacán"
            className="app-footer__crest"
          />
          <div className="app-footer__copy">
            <p className="app-footer__heading">Información y trámites</p>
            <a
              href="#"
              className="app-footer__link"
              onClick={(event) => event.preventDefault()}
            >
              Aviso de protección de datos institucional
            </a>
          </div>
        </div>

        <div className="app-footer__socials" aria-label="Redes sociales">
          <a
            href="#"
            className="app-footer__social-link"
            aria-label="X"
            onClick={(event) => event.preventDefault()}
          >
            <XSocialIcon />
          </a>
          <a
            href="#"
            className="app-footer__social-link"
            aria-label="Facebook"
            onClick={(event) => event.preventDefault()}
          >
            <FacebookFilled />
          </a>
          <a
            href="#"
            className="app-footer__social-link"
            aria-label="Instagram"
            onClick={(event) => event.preventDefault()}
          >
            <InstagramOutlined />
          </a>
        </div>
      </div>

      <div className="app-footer__bottom">
        <p className="app-footer__legal">
          © Desarrollado por la Dirección General de Gobierno Digital |
          {' '}
          <span className="app-footer__legal-strong">
            Gobierno del Estado de Michoacán {currentYear}
          </span>
        </p>
        <p className="app-footer__version">Versión 1.0.0</p>
      </div>
    </div>
  </footer>
);

export default AppFooter;
