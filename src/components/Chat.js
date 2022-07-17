import React, { useRef, useState } from 'react'
import styles from './Chat.module.css'


function Chat(props) {
    let inputRef = useRef('')
    let [formIsValid, setFormIsValid] = useState(false)

    let inputHandler = () => {
        if (inputRef.current.value.length > 0) {
            setFormIsValid(true)
        }
        else {
            setFormIsValid(false)
        }
    }

    let formSubmitHandler = (e) => {
        e.preventDefault()

        const msg = {
            input: inputRef.current.value,
        };
        props.chat(msg)

        inputRef.current.value = ''
        setFormIsValid(false)
        // props.chats.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={styles.control}>
            <ul>
                {props.chats.map((chat) => (
                    <h3 className={styles.chat}>{chat.input}</h3>
                ))}
            </ul>
            <h3>Click 'refresh' button to refresh chat😭</h3>
            <form onSubmit={formSubmitHandler} className={styles.form}>
                <input
                    onChange={inputHandler}
                    ref={inputRef}
                    type='text' />
                <button
                    type='submit'
                    disabled={!formIsValid}
                >Send</button>
            </form>
        </div>
    )
}

export default Chat