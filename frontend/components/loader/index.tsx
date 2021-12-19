import styles from './loader.module.scss';
const Loader = () => {
  return (
    <div className={styles.loading}>
      {
        Array(6).fill(0).map((item: any, index: number) => (<div className={styles.item} key={index}></div>))
      }
    </div>
  )
}
export default Loader