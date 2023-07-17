import React from 'react';
import {View, Text, Stylesheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import colors from '../config/colors';

function NextButton(props) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View>
      <Svg width={size} height={size}>
        <Circle
          stroke="#7cd36c"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#ace7a3"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * 25) / 100}
        />
      </Svg>
    </View>
  );
}

export default NextButton;
