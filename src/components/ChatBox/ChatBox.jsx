import React, {useState} from "react";
import ListMessage from "../ListMessage/ListMessage";
import UserInput from "../UserInput/UserInput";

import './ChatBox.scss'

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      isComing: true,
      content: 'Hi'
    }
  ]);

  const sendMessage = (content) => {
    setMessages([...messages, {content, isComing: false}])
  }

  return <div className="chat-box">
    <ListMessage messages={messages}/>
    <UserInput sendMessage={sendMessage}/>
  </div>
}

export default ChatBox;
