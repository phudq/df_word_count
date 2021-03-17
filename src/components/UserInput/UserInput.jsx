import React, {useState, useRef} from 'react'
import ProcessBar from "../ProgressBar";

import './UserInput.scss'
// import ContentEditable from "./ContentEditable";
import ContentEditable from 'react-contenteditable'

function UserInput() {
  const [content, setContent] = useState(null);
  const [counter, setCounter] = useState(0);

  const onChange = (evt) => {
    let value = normalizeHtml(evt.target.value);
    if (!value) return;
    value = value.replace(/<span class="red">|<span>|<\/span>/g, '');
    const contentArray = value.split(/<\/div>|<div>/).filter(e => !!e);
    value = replace(contentArray);
    setContent(value)
  }

  return <div className="user-input">
    <ContentEditable
      className="content-editable"
      html={content}
      onChange={onChange}
    />
    <div className="action">
      <ProcessBar
        size={20}
        progress={10}
        strokeWidth={2}
        circleOneStroke="#d9edfe"
        circleTwoStroke={'#7ea9e1'}
      />
      <button className="reply">Reply</button>
    </div>
  </div>
}

function findStartIndexMaxCount(contentArray = [], maxCount = 50) {
  let count = 0;
  for (let [index, string] of contentArray.entries()) {
    if (string.length + count >= maxCount && string !== '</br>') {
      return {
        line: index,
        indexInline: maxCount - count - 1
      }
    }
    count += string.length
  }
  return {}
}

function replace(arrayContent = []) {
  const {line, indexInline} = findStartIndexMaxCount(arrayContent, 10);
  if (isNaN(line) || isNaN(indexInline)) {
    return arrayContent.map(e => `<div>${e}</div>`).join('');
  }
  const preLine = arrayContent.slice(0, line).map(e => `<div>${e}</div>`);
  const currentLine = '<div>' + arrayContent[line].slice(0, indexInline) + `<span class="red">${arrayContent[line].slice(indexInline)}</span>` + '</div>'

  const nextLine = arrayContent
    .slice(line + 1)
    .map(e => `<div><span class="red">${e}</span></div>`)
  return [].concat(preLine, currentLine, nextLine).join('')
}

function normalizeHtml(str) {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}


export default UserInput;
