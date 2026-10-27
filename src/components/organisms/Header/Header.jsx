import styles from './Header.module.css';
import Logo from '../../atoms/Logo/Logo';
import LanguageSwitcher from '../../molecules/LanguageSwitcher/LanguageSwitcher';

function Header({ language, onLanguageChange }) {
  return (
    <header className={styles.header}>
      <Logo />
      <LanguageSwitcher language={language} onChange={onLanguageChange} />
    </header>
  );
}

export default Header;
