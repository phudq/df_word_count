import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

const ProgressBar = props => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const {
    size,
    progress,
    colorCircleStroke,
    text
  } = props;

  const strokeWidth = 2;
  const circleOneStroke = "#dddddd";
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
    circleRef.current.style = 'transition: stroke-dashoffset 150ms ease-in-out';
  }, [setOffset, progress, circumference, offset]);

  return (
    <>
      <svg
        className="svg"
        width={size}
        height={size}
      >
        <circle
          className="svg-circle-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="svg-circle"
          ref={circleRef}
          stroke={colorCircleStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        {
          !isNaN(text) &&
          <text
            x="50%" y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="svg-circle-text">
            {text}
          </text>
        }
      </svg>
    </>
  );
}

ProgressBar.propTypes = {
  size: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleOneStroke: PropTypes.string.isRequired,
  circleTwoStroke: PropTypes.string.isRequired
}

export default ProgressBar;
