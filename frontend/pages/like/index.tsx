import { useState, forwardRef } from 'react'
import Layout from '../../components/layout'
import Card from '../../components/card'
import ScrollBottom from '../../components/scroll-bottom'
import Loader from '../../components/loader'
import { getUsers } from '../../lib/user'
import styles from './like.module.scss'
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
        listUser && listUser.map((person: IUser, index: number) => (
          <div className={styles.image} key={index}>
            <Card person={person}/>
          </div>
        ))
      }
    </>
  )
}
const Like = () => {
  const [page, setPage] = useState(1)
  const pages = []
  for (let i = 0; i < page; i++) {
    pages.push(<List page={i} key={i} />)
  }
  return (
    <Layout>
      <div className={styles.wrapper}>
        <ScrollBottom customClass={styles.container} onTouchBottom={() => setPage(page + 1)}>
          {pages}
        </ScrollBottom>
      </div>
    </Layout>
  )
}

export default forwardRef(Like)