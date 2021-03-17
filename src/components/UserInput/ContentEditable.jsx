import React, {useRef, useCallback, useEffect} from "react";

function ContentEditable({html, onChange, ...restProps}) {
  const ref = useRef(null);
  const emitChange = useCallback(() => {
    const event = ref?.current;
    if (!event) return;
    onChange({target: {value: event.innerHTML}})
  }, [ref])

  useEffect(() => {
    console.log(ref.current, 'render');
  }, [ref])

  return React.createElement(
    'div',
    {
      ...restProps,
      ref,
      onInput: emitChange,
      contentEditable: true,
      dangerouslySetInnerHTML: {__html: html}
    });
}

export default React.memo(ContentEditable, ((prevProps, nextProps) => {
  return
}))

function normalizeHtml(str) {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}
