import React, {useState} from 'react'
import {Editor, EditorState, CompositeDecorator, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import './UserInput.scss'
import Counter from "../Counter";

const maxCount = 50;

const Overflow = (props) => {
  return (
    <span className="content-overflow">
      {props.children}
    </span>
  );
}

const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleOverflow,
    component: Overflow,
  }
]);

function getLengthPrevBlock(contentState, blockKey) {
  return contentState.getBlockMap().reduce((acm, current, key) => {
    const blockLength = current.getLength();
    const length = acm.preLength + blockLength;
    return Object.assign(acm, {
      [key]: length,
      preLength: length
    })
  }, {preLength: 0})[blockKey];
}

function handleOverflow(contentBlock, callback, contentState) {
  const length = getLengthPrevBlock(contentState, contentBlock.getKey());
  const blockLength = contentBlock.getLength();
  if (length > maxCount) {
    const start = length - blockLength >= maxCount ? 0 : maxCount;
    callback(start, blockLength)
  }
}

function UserInput({sendMessage}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(compositeDecorator),
  );
  const [count, setCount] = useState(0);

  const handleSendMessage = () => {
    const content = editorState.getCurrentContent().getPlainText()
    sendMessage(content)
    const newEditorState = EditorState.push(editorState, ContentState.createFromText(''));
    setEditorState(newEditorState);
    setCount(0)
  }

  const onEditorChange = (editorState) => {
    setEditorState(editorState);
    const plainText = editorState.getCurrentContent().getPlainText();
    const contentLength = plainText.replace(/\n/g, '').length;
    setCount(contentLength);
  }

  return <div className="user-input">
    <div className="editor">
      <Editor
        editorState={editorState}
        onChange={onEditorChange}
        placeholder="Write a tweet..."
      />
    </div>
    <div className="action">
      <Counter count={count} maxCount={maxCount}/>
      <button
        onClick={handleSendMessage}
        className="reply-btn"
        disabled={count > maxCount}
      >Reply
      </button>
    </div>
  </div>
}

export default UserInput;
