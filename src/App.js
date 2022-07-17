import React, { useState, useEffect, useCallback } from "react";
import styles from '../src/App.module.css'
import Chat from "./components/Chat";
import NavBar from '../src/components/NavBar'

function App() {
  let [chats, setChats] = useState([])
  let [refresh, setRefresh] = useState(false)
  let [error, setError] = useState(null)
  let fetchChatHandler = useCallback(async () => {
    setRefresh(true)
    setError(null)
    try {
      let res = await fetch('https://simple-chat-app-f3dd1-default-rtdb.firebaseio.com/chat.json')
      if (!res.ok) {
        throw new Error('Something Went Wrong')
      }

      let data = await res.json()

      const loadedChat = [];

      for (const key in data) {
        loadedChat.push({
          id: key,
          input: data[key].input,
        });
      }
      setChats(loadedChat)
    } catch (error) {
      setError(error.message)
    }

    setRefresh(false)
  }, [])



  let addChatHandler = async (chat) => {
    let res = await fetch('https://simple-chat-app-f3dd1-default-rtdb.firebaseio.com/chat.json', {
      method: 'POST',
      body: JSON.stringify(chat),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    fetchChatHandler()
    let data = await res.json()
    console.log(data)
  }

  useEffect(() => {
    fetchChatHandler()
  }, [fetchChatHandler])



  return (
    <div className={styles.app1}>
      <NavBar fetch={fetchChatHandler} />
      <div className={styles.app}>
        {/* <ChatList /> */}
        <Chat chats={chats} chat={addChatHandler} />
        {!refresh && chats.length === 0 && !error && <div><h3>No text found.Send the first text.😉</h3></div>}
        {refresh && <h3>Refreshing....</h3>}
        {error && <h3>{error}</h3>}
      </div>
    </div>
  );
}

export default App;
