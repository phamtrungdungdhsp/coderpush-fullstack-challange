import React, { useState, forwardRef, useMemo, useRef, createRef, useImperativeHandle, useEffect } from 'react'
import Image from 'next/image'
import TinderCard from 'react-tinder-card'
import { getUsers, likePerson, passPerson } from '../../lib/user'
import styles from './tinder.module.scss'
import Loader from '../../components/loader'
import { toast } from 'react-toastify'
import { handleName } from '../../helpers/common'
import { IUser } from '../../interfaces/common'

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
      changePage()
    }
  }

  const outOfFrame = async (index: number, dir: string): Promise<void> => {
    currentIndexRef.current >= index && childRefs[index]?.current.restoreCard()
    if (dir === 'left') {
      passPerson(listUser[index].id)
      toast.info(<div><b>Didn&apos;t find her?</b> <br /> Keep discovering!</div>, {
        position: 'top-right',
        theme: 'colored',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } else {
      const result = await likePerson(listUser[index].id)
      if (result.match) {
        toast.success(<div><b>New match</b> <br /> Send her a messsage!</div>, {
          position: 'top-right',
          theme: 'colored',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    }
  }

  useImperativeHandle(ref, () => ({
    swipe: async (dir: string) => {
      try {
        await childRefs[currentIndex]?.current?.swipe(dir)
      } catch (e) {
        // avoid unexpected error
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }))

  // eslint-disable-next-line no-unused-vars
  const swiped = (index: number, dir: string): void => {
    updateCurrentIndex(index - 1)
  }


  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className="backdrop" style={{ borderRadius: '1em' }}></div>
        <div className="loader">
          <Loader />
        </div>
      </div>
    )
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {listUser && listUser.map((person: IUser, index: number) => (
            <TinderCard
              ref={childRefs[index]}
              className={styles.swipe}
              key={index}
              onSwipe={(dir: string) => swiped(index, dir)}
              onCardLeftScreen={(dir: string) => outOfFrame(index, dir)}
              preventSwipe={['up', 'down']}
            >
              <Image src={person.picture} layout="fill" objectFit="cover" className={styles.image} alt={person.id} loading="lazy" />
              <div className={styles.info}>
                <p><span className={styles.name}
                >{handleName(person.firstName, person.lastName)}</span>, <span className={styles.age}>{person.age}</span></p>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eius dolores quam alias culpa quos quod aliquid odio,
                  ex harum veritatis ratione cupiditate incidunt voluptatum omnis explicabo nostrum accusamus soluta animi.</p>
              </div>
            </TinderCard>
          ))}
        </div>
      </div>
    </>
  )
}

export default forwardRef(Tinder)
