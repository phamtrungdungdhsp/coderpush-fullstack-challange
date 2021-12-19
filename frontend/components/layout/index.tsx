import type { NextComponentType } from 'next'
import Link from 'next/link'
import { useRouter } from "next/router";

import styles from './layout.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
const Layout: NextComponentType = ({ children }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.navLink}>
          <li>
            <Link href="/like" passHref><FontAwesomeIcon icon={faThumbsUp} size='2x' color={router.pathname === '/like' ? '#FE3C72': '#424242'}/></Link>
          </li>
          <li>
          <Link href="/discover" passHref><FontAwesomeIcon icon={faHeart} size='2x' color={router.pathname === '/discover' ? '#FE3C72': '#424242'}/></Link>
          </li>
          <li>
            <Link href="/match" passHref><FontAwesomeIcon icon={faComment} size='2x' color={router.pathname === '/match' ? '#FE3C72': '#424242'}/></Link>
          </li>
        </ul>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout