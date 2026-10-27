import styles from './PageIntro.module.css';

function PageIntro({ title, description }) {
  return (
    <section className={styles.intro}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </section>
  );
}

export default PageIntro;
