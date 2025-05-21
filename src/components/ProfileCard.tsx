import Image from 'next/image';
import styles from './ProfileCard.module.css';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';


const ProfileCard: React.FC = async() => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  console.log(getServerSession(authOptions))
  console.log(session)
  console.log("kaha hai beby")

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <Image
          src={session?.user.image || "/Groupie.jpg"} // Ensure this image is in the public folder
          alt="User Avatar"
          width={100}
          height={100}
        />
      </div>
      <h2 className={styles.name}>{session?.user.username || "anonymous"}</h2>
      <p className={styles.username}>{session?.user.email || "anonymous"}</p>
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

// "use client"
// import Image from 'next/image';
// import styles from './ProfileCard.module.css';
// import { useSession } from 'next-auth/react';
// import { User } from 'next-auth';



// const ProfileCard: React.FC = () => {
//   const { data: session } = useSession();
//   const user: User = session?.user as User


//   return (
//     <div className={styles.card}>
//       <div className={styles.avatarContainer}>
//         <Image
//           src={session?.user.image || "/Groupie.jpg"} // Ensure this image is in the public folder
//           alt="User Avatar"
//           width={100}
//           height={100}
//         />
//       </div>
//       <h2 className={styles.name}>{session?.user.name || "anonymous"}</h2>
//       <p className={styles.username}>{session?.user.email || "anonymous"}</p>
//       <hr className={styles.divider} />
//       <ul className={styles.details}>
//         <li>
//           <span>📍</span> Located in India
//         </li>
//         <li>
//           <span>👤</span> Joined in May 2021
//         </li>
//         <li>
//           <span>🗣️</span> English
//         </li>
//       </ul>
//       <p className={styles.workingHours}>Preferred working hours</p>
//     </div>
//   );
// };

// export default ProfileCard;

