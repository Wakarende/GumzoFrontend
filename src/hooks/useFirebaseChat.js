import {useState, useEffect, useCallback} from 'react';
import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from '@firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import {getAuth} from '@firebase/auth';
//Local imports
import firebaseApp from '../../firebaseConfig';
import {generateChatId} from '../utils/chatUtils';
import {uploadAudioToStorage} from '../utils/audioUtils';

export const useFirebaseChat = otherUserId => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth(firebaseApp);
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserId(currentUser.uid);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId && otherUserId) {
      const chatId = generateChatId(userId, otherUserId);
      const db = getFirestore(firebaseApp);
      const messagesQuery = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy('createdAt', 'desc'),
      );
      const unsubscribe = onSnapshot(messagesQuery, snapshot => {
        let newMessages = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            newMessages.push(change.doc.data());
          }
        });
        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, newMessages),
        );
      });
      return () => unsubscribe();
    }
  }, [userId, otherUserId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      //debugging
      console.log('onSend called with newMessages:', newMessages);
      const db = getFirestore(firebaseApp);
      const chatId = generateChatId(userId, otherUserId);
      console.log('chatId: ', chatId);
      for (const message of newMessages) {
        console.log('Iterate through the message: ', message);
        const {_id, text, createdAt, user} = message;
        const messageRef = doc(db, `chats/${chatId}/messages`, _id);
        let audioURL = null;
        if (message.audio) {
          audioURL = await uploadAudioToStorage(message.audio);
        }
        try {
          await messageRef.set({
            _id,
            text,
            createdAt: createdAt.toISOString(),
            user,
            audio: audioURL,
          });
          console.log('Message saved to Firestore:', message);
        } catch (error) {
          console.error('Error Saving message to Firestore: ', error);
        }
      }
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
      console.log('Local state updated with newMessages');
    },
    [userId, otherUserId],
  );

  return {
    messages,
    setMessages,
    userId,
    onSend,
  };
};
