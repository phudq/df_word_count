import React from "react";

function Message({content, isComing}) {
  return <div
    className={`message-box ${isComing ? 'is-coming' : 'is-going'}`}
  >
    <div className="message-content" dangerouslySetInnerHTML={{__html: content}}/>
  </div>
}

export default Message;
