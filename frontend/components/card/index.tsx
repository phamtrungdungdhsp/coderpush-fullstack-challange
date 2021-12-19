import Image from 'next/image'
import styles from './card.module.scss'
const Card = ({ src, name, age }: { src: string, name: string, age: number }) => {
  return (
    <div className={styles.image}>
      <Image src={src} layout="fill" objectFit="cover" className={styles.img} alt="image"/>
      <div className={styles.backDrop}></div>
      <div className={styles.bar}>
        <p className={styles.line}>{name}, {age}</p>
      </div>
    </div>
  )
}

export default Card