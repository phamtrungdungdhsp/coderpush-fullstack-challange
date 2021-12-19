import Image from 'next/image'
import { handleName } from '../../helpers/common'
import { IUser } from '../../interfaces/common'
import styles from './card.module.scss'

const Card = ({ person }: { person: IUser }) => {

  return (
    <div className={styles.image}>
      <Image src={person.picture} layout="fill" objectFit="cover" className={styles.img} alt="image"/>
      <div className={styles.backDrop}></div>
      <div className={styles.bar}>
        <p className={styles.line}>{handleName(person.firstName, person.lastName)}, {person.age || 28}</p>
      </div>
    </div>
  )
}

export default Card