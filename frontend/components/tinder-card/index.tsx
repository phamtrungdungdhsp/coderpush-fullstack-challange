import React, { useState, forwardRef, useMemo, useRef, createRef, useImperativeHandle, useEffect } from 'react'
import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { getUsers } from '../../lib/user'
import styles from './tinder.module.scss'
import Loader from '../../components/loader'
React.useLayoutEffect = React.useEffect

const Tinder = ({ page, changePage }: { page: number, changePage: any }, ref: any) => {
  const { listUser, isLoading } = getUsers(page || 1)  
  const [currentIndex, setCurrentIndex] = useState(listUser.length - 1)
  useEffect(() => {
    setCurrentIndex(listUser.length - 1)
  }, [listUser])
  const childRefs = useMemo(() => {
    return listUser.map(() => createRef<any>())
  }, [listUser])
  const currentIndexRef = useRef(currentIndex)

  const updateCurrentIndex = async (index: number): Promise<void> => {
    setCurrentIndex(index)
    currentIndexRef.current = index
    if (index < 0) {
      setTimeout(() => changePage(), 200)
    }
  }

  const outOfFrame = (index: number): void => {
    currentIndexRef.current >= index && childRefs[index]?.current.restoreCard();
  }
  useImperativeHandle(ref, () => ({
    swipe: async (dir: string) => {
      await childRefs[currentIndex]?.current?.swipe(dir)
    }
  }))

  const swiped = (index: number): void => {
    updateCurrentIndex(index - 1)
  }

  if (isLoading) {
    return (
        <div className={styles.wrapper}>
          <div className="backdrop" style={{ borderRadius: '1em'}}></div>
          <div className="loader">
            <Loader />
          </div>
        </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {listUser && listUser.map((person: any, index: number) => (
          <TinderCard
            ref={childRefs[index]}
            className={styles.swipe}
            key={person.id}
            onSwipe={() => swiped(index)}
            onCardLeftScreen={() => outOfFrame(index)}
            preventSwipe={['up', 'down']}
          >
            <Image src={person.picture} layout="fill" objectFit="cover" className={styles.image} alt={person.id} />
            <div className={styles.info}>
              <p><span className={styles.name}>Mily Norman</span>, <span  className={styles.age}>22</span></p>
              <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolores quam alias culpa quos quod aliquid odio, ex harum veritatis ratione cupiditate incidunt voluptatum omnis explicabo nostrum accusamus soluta animi.</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  )
}

export default forwardRef(Tinder)
