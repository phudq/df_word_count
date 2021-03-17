import React, {useState, useRef} from 'react'
import ProcessBar from "../Counter/ProgressBar";
import {Editor, EditorState, CompositeDecorator} from 'draft-js';
import 'draft-js/dist/Draft.css';

import './UserInput.scss'
import Counter from "../Counter";

const maxCount = 50;

const Overflow = (props) => {
  return (
    <span {...props} className="content-overflow">
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

function UserInput() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(compositeDecorator),
  );
  const [count, setCount] = useState(0);

  const onChange = (editorState) => {
    setEditorState(editorState);
    const plainText = editorState.getCurrentContent().getPlainText();
    const contentLength = plainText.replace(/\n/g, '').length;
    setCount(contentLength);
  }

  return <div className="user-input">
    <div className="editor">
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Write a tweet..."
      />
    </div>
    <div className="action">
      <Counter count={count} maxCount={maxCount}/>
      <button className="reply">Reply</button>
    </div>
  </div>
}

export default UserInput;
