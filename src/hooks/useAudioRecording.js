import {useState, useCallback} from 'react';
import {Audio} from 'expo-av';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const useAudioRecording = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURI, setAudioURI] = useState(null);

  const checkPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (result === RESULTS.DENIED) {
        const requestResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return requestResult === RESULTS.GRANTED;
      } else {
        return result === RESULTS.GRANTED;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const startRecording = useCallback(async () => {
    if (isRecording) return;
    const hasPermission = await checkPermission();
    if (!hasPermission) return;
    setAudioURI(null);
    const newRecording = new Audio.Recording();
    setRecording(newRecording);
    await newRecording.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
    );
    await newRecording.startAsync();
    setIsRecording(true);
  }, [isRecording]);

  const stopRecording = useCallback(async () => {
    if (!isRecording) return;
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioURI(uri);
      setIsRecording(false);
    }
  }, [isRecording, recording]);

  return {
    recording,
    isRecording,
    startRecording,
    stopRecording,
    audioURI,
    setAudioURI,
  };
};
