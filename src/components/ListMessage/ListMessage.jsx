import React from "react";
import Message from "./Message";
import './ListMessage.scss';

function ListMessage({messages = []}) {
  return <div className="list-message">
    {messages.map((message, index) => {
      return <Message key={index} {...message}/>
    })}
  </div>
}

export default React.memo(ListMessage);
