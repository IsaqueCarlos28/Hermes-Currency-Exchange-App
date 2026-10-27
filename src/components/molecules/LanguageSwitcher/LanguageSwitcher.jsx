import styles from './LanguageSwitcher.module.css';

const LANGUAGES = ['PT', 'EN', 'ES'];

const NAV_LABELS = {
  PT: 'Idioma',
  EN: 'Language',
  ES: 'Idioma',
};

function LanguageSwitcher({ language, onChange }) {
  const navLabel = NAV_LABELS[language] || NAV_LABELS.PT;

  return (
    <nav className={styles.switcher} aria-label={navLabel}>
      {LANGUAGES.map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            type="button"
            className={isActive ? styles.active : styles.button}
            onClick={() => onChange?.(lang)}
            aria-current={isActive ? 'true' : undefined}
          >
            {lang}
          </button>
        );
      })}
    </nav>
  );
}

export default LanguageSwitcher;
