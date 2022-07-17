import React from 'react'

function ChatList(props) {
  return (
    <div>
        <ul>
            {props.chats.map((chat) =>(
              <h1>{chat.input}</h1>
            ))}
        </ul>
    </div>
  )
}

export default ChatList