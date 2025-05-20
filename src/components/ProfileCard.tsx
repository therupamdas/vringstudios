import Image from 'next/image';
import styles from './ProfileCard.module.css';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';



const ProfileCard: React.FC = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User


  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <Image
          src="/Groupie.jpg" // Ensure this image is in the public folder
          alt="User Avatar"
          width={200}
          height={200}
          className={styles.avatar}
        />
      </div>
      <h2 className={styles.name}>name</h2>
      <p className={styles.username}>also name</p>
      <hr className={styles.divider} />
      <ul className={styles.details}>
        <li>
          <span>📍</span> Located in India
        </li>
        <li>
          <span>👤</span> Joined in May 2021
        </li>
        <li>
          <span>🗣️</span> English
        </li>
      </ul>
      <p className={styles.workingHours}>Preferred working hours</p>
    </div>
  );
};

export default ProfileCard;
