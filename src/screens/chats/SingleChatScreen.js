import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, StyleSheet} from 'react-native';

//local imports
import CustomChatInput from '../../components/inputs/CustomChatInput';
import AudioMessagePlayer from '../../components/AudioMessagePlayer';
import BackArrow from '../../components/BackArrow';
import ChatActions from '../../components/ChatActions';
import ChatBubble from '../../components/ChatBubble';
import {useAudioRecording} from '../../hooks/useAudioRecording';
import {useFirebaseChat} from '../../hooks/useFirebaseChat';

function SingleChatScreen({navigation, route}) {
  const [isUnloaded, setIsUnloaded] = useState(false);

  // const [messages, setMessages] = useState([]);
  // const [userId, setUserId] = useState(null);
  const otherUserId = route.params.otherUserId;
  console.log('Other User ID:', otherUserId);

  // Use the custom hook for audio recording logic
  const {
    recording,
    isRecording,
    audioURI,
    isAudioReadyToSend,
    startRecording,
    stopRecording,
    sendAudioMessage,
  } = useAudioRecording();

  // Use the custom hook for Firebase chat management
  const {messages, userId, onSend} = useFirebaseChat(otherUserId);

  useEffect(() => {
    return () => {
      //stop and unload the recording when the component unmounts if it's currently recording
      if (isRecording && recording && !isUnloaded) {
        recording.stopAndUnloadAsync().then(() => {
          setIsUnloaded(true);
        });
      }
    };
  }, [isRecording, recording, isUnloaded]);

  console.log('Messages: ', messages);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackArrow
          onPress={() => navigation.navigate('Chats')}
          style={styles.backArrow}
        />
      </View>
      <GiftedChat
        messages={messages}
        renderActions={() => (
          <ChatActions
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />
        )}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
        renderInputToolbar={props => (
          <CustomChatInput
            {...props}
            onSendMessage={onSend}
            startRecording={startRecording}
            stopRecording={stopRecording}
            isAudioReadyToSend={isAudioReadyToSend}
            userId={userId}
            otherUserId={otherUserId}
          />
        )}
        renderMessageAudio={message => (
          <AudioMessagePlayer audioURL={message.currentMessage.audio} />
        )}
        style={styles.giftedChat}
        renderBubble={props => <ChatBubble {...props} />}
      />
    </View>
  );
}

//Stylesheet
const styles = StyleSheet.create({
  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  container: {
    flex: 1,
    // paddingVertical: 3
    paddingBottom: 30,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  giftedChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    width: 100,
  },
});
export default SingleChatScreen;
