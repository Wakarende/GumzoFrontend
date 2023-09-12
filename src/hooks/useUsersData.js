import {useState, useEffect} from 'react';

//Local imports
import {fetchCurrentUser, fetchUsers} from '../utils/firebaseService';
import {getAuth} from '@firebase/auth';
import firebaseApp from '../../firebaseConfig';
export const useUsersData = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      //Fetch all users from the database
      const fetchedUsers = await fetchUsers();
      //Get the current authenticated user's ID using Firebase Auth
      const auth = getAuth(firebaseApp);
      const userId = auth.currentUser.uid;
      //Filter out the authenticated user from the fecthed user list
      const filteredUsers = fetchedUsers.filter(user => user.uid !== userId);
      //Fetch detailed information of the current authenticated user
      const fetchedCurrentUser = await fetchCurrentUser(userId);

      //Update the state with the fetched user
      setCurrentUser(fetchedCurrentUser);
      setUsers(filteredUsers);
    };
    //Invoke the data fetching function
    fetchData();
  }, []);

  //Return the users and current user's data for use in the component
  return {users, currentUser};
};
