import {useEffect, useState} from 'react';
import {
  collection,
  getFirestore,
  where,
  query,
  getDocs,
} from '@firebase/firestore';
//local imports
import firebaseApp from '../../firebaseConfig';

//Function to count how many machRequests a user has
const useMatchesCount = user => {
  const [matchesCount, setMatchesCount] = useState(0);
  useEffect(() => {
    if (user) {
      const fetchMatchesCount = async () => {
        const db = getFirestore(firebaseApp);
        const matchesQuery = query(
          collection(db, 'matchRequests'),
          where('recieverId', '==', user.uid),
          where('status', '==', 'pending'),
        );
        const querySnapshot = await getDocs(matchesQuery);
        setMatchesCount(querySnapshot.size);
      };

      fetchMatchesCount();
    }
  }, [user]);

  return matchesCount;
};

export default useMatchesCount;
