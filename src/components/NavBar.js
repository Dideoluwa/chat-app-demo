import React from 'react'
import styles from './NavBar.module.css'

function NavBar(props) {
     return (
    <div className={styles.nav}>
        <button onClick={props.fetch} className={styles.button}>Refresh</button>
    </div>
  )
}

export default NavBar