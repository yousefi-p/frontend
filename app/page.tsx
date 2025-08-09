'use client';
import styles from './page.module.css'



export default function Home() {


  return (
    <div className={styles.boxContainer + " "}>
            <video width="auto" height="100%" autoPlay loop muted className={styles.courtVideo + " "}>
        <source src="/court-video.mp4" type="video/mp4" />
      </video>
      <div className={styles.content + " mb-3"} dir="rtl">

        <h1>باشگاه تنیس ام کلاب</h1>
        <p >به دنیای تنیس خوش آمدید!</p>
    </div>
    </div>
  );
}
