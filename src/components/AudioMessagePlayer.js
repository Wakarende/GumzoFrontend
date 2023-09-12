import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Audio} from 'expo-av';
import AppText from './text/AppText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

function AudioMessagePlayer({audioURL}) {
  const [sound, setSound] = useState(null);

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync({uri: audioURL});
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity onPress={playSound}>
      {/* You can put an icon or text here to indicate audio */}
      <MaterialCommunityIcons name="play" size={24} color={colors.lightGray} />
      <AppText>Play Audio</AppText>
    </TouchableOpacity>
  );
}

export default AudioMessagePlayer;
