import React, {useMemo} from 'react'
import ProcessBar from "./ProgressBar/ProgressBar";

function Counter({count, maxCount = 50}) {

  const progress = useMemo(() => {
    const percent = (count / maxCount) * 100
    return percent > 100 ? 100 : percent;
  }, [count, maxCount])

  const colorCircleStroke = useMemo(() => {
    if (count > 40 && count < 50) {
      return 'yellow'
    } else if (count >= 50) {
      return 'red';
    }
    return '#7ea9e1'
  }, [count]);

  return <div>
    <ProcessBar
      size={20}
      progress={progress}
      text={maxCount - count < 20 && maxCount - count}
      strokeWidth={2}
      colorCircleStroke={colorCircleStroke}
    />
  </div>
}

export default Counter;
