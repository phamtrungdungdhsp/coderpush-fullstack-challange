import { useState, forwardRef } from 'react'
import Layout from '../../components/layout'
import Card from '../../components/card'
import ScrollBottom from '../../components/scroll-bottom'
import Loader from '../../components/loader'
import { getLikedUser } from '../../lib/user'
import styles from './like.module.scss'
import { IUser } from '../../interfaces/common'

const List = ({ page }: { page: number }) => {
  const { listUser, isLoading }: { listUser: IUser[], isLoading: boolean } = getLikedUser(page || 1, 10)
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
        listUser.length === 0 && page === 1 ? (
          <div className={styles.empty}>
            Empty
          </div>
        ) : (
          <div className={styles.container}>
            {
              listUser.length !== 0 && listUser.map((person: IUser, index: number) => (
                <div className={styles.image} key={index}>
                  <Card person={person} />
                </div>
              ))
            }
          </div>
        )
      }
    </>
  )
}
const Like = () => {
  const [page, setPage] = useState(1)
  const pages = []
  for (let i = 1; i <= page; i++) {
    pages.push(<List page={i} key={i} />)
  }
  
  return (
    <Layout>
      <div className={styles.wrapper}>
        <ScrollBottom onTouchBottom={() => setPage(page + 1)}>
          {pages}
        </ScrollBottom>
      </div>
    </Layout>
  )
}

export default forwardRef(Like)