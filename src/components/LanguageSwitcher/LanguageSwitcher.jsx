import styles from './LanguageSwitcher.module.css';

function LanguageSwitcher({ language, onChange }) {
  const languages = ['PT', 'EN', 'ES'];

  return (
    <div className={styles.switcher}>
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          className={language === lang ? styles.active : styles.button}
          onClick={() => onChange?.(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
