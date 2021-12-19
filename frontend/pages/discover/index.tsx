import React, { useRef, useState } from 'react'
import Layout from '../../components/layout'

import styles from './discover.module.scss'
import Tinder from '../../components/tinder-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faHeart } from '@fortawesome/free-solid-svg-icons'

const Discover = () => {
  const ref = useRef<any>(null)
  const [page, setPage] = useState(1)
  const changePage = () => {
    setPage(page + 1)
  }

  const pass = (): void => {
    ref.current?.swipe('left')
  }

  const like = (): void => {
    // TODO: Call api /like
    ref.current?.swipe('right')
  }
  return (
    <Layout>
      <div className={styles.container}>
        <Tinder changePage={changePage} page={page} ref={ref} />
        <div className={styles.buttons}>
          <div className={styles.pass} onClick={() => pass()}>
            <FontAwesomeIcon icon={faTimes} color="#FE3C72" size="2x" />
          </div>
          <div className={styles.like} onClick={() => like()}>
            <FontAwesomeIcon icon={faHeart} color="#FE3C72" size="2x" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Discover