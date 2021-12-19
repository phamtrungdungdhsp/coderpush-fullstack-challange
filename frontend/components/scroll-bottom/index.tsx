import { useEffect, useRef } from 'react'
import styles from './scroll-bottom.module.scss'

const ScrollBottom = ({ children, customClass, onTouchBottom }: { children: any, customClass: string, onTouchBottom: any }) => {
  const listRef = useRef<any>()
  const onLoadmore = () => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      onTouchBottom()
    }
  }
  return (
    <div className={`${styles.container} ${customClass} no-scroll-bar`} onScroll={onLoadmore} ref={listRef}>
      {children}
    </div>
  )
}

export default ScrollBottom