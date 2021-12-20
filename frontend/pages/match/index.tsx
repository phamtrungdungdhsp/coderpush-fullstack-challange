import { useState } from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'
import styles from './matches.module.scss'
import { getUsers } from '../../lib/user'
import Loader from '../../components/loader'
import ScrollBottom from '../../components/scroll-bottom'
import { handleName } from '../../helpers/common'
import { IUser } from '../../interfaces/common'

const List = ({ page }: { page: number }) => {
  const { listUser, isLoading }: { listUser: IUser[], isLoading: boolean } = getUsers(page || 1)
  if (isLoading) {
    return (
      <div className="backdrop">
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    )
  }
  
  return (
    <>
      {
        listUser.length && listUser.map((person: IUser, index: number) => (
          <li className={styles.item} key={index}>
            <div className={styles.image}>
              <Image src={person.picture} layout="fill" objectFit="cover" className={styles.img} alt={person.id} loading="lazy"/>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{handleName(person.firstName, person.lastName)}</p>
              <p className={styles.age}>{person.age || 22}</p>
            </div>
          </li>
        ))
      }
    </>
  )
}

const Matches = () => {
  const [page, setPage] = useState(1)
  const pages = []
  for (let i = 0; i < page; i++) {
    pages.push(<List page={i} key={i} />)
  }
  return (
    <Layout>
      <div className={styles.wrapper}>
        <p className={styles.title}>Match: </p>
        <div className={styles.container}>
          <ScrollBottom customClass={`${styles.list}`} onTouchBottom={() => setPage(page + 1)}>
              {pages}
            </ScrollBottom>
        </div>
      </div>

    </Layout>
  )
}

export default Matches