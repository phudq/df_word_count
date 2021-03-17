import React from "react";
import Message from "./Message";

function ListMessage({messages = []}) {
  return <div className="list-message">
    {messages.map(message => {
      return <Message {...message}/>
    })}
  </div>
}

export default React.memo(ListMessage);
