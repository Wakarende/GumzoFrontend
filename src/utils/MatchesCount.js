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

/**
 * Custom React hook to retrieve and count the number of match requests a user has received.
 *
 * @param {Object} user - The authenticated user's object, containing details like UID.
 * @returns {number} The count of match requests with 'pending' status for the provided user.
 */
const useMatchesCount = user => {
  //Local state to store  the match request count
  const [matchesCount, setMatchesCount] = useState(0);
  useEffect(() => {
    if (user) {
      /**
       * Asynchronous function to fetch and count match requests for the given user.
       * Counts match requests where the 'recieverId' matches the user's UID and the status is 'pending'.
       */

      const fetchMatchesCount = async () => {
        //Get instance of the Firestore database
        const db = getFirestore(firebaseApp);

        //Construct the query to retrieve pending match requests for the user
        const matchesQuery = query(
          collection(db, 'matchRequests'),
          where('recieverId', '==', user.uid),
          where('status', '==', 'pending'),
        );
        const querySnapshot = await getDocs(matchesQuery);

        //Update the local state with the count of retrieved match requests
        setMatchesCount(querySnapshot.size);
      };

      fetchMatchesCount();
    }
  }, [user]);

  return matchesCount;
};

export default useMatchesCount;
