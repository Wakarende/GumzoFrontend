import {useState, useEffect} from 'react';
import {fetchCurrentUser, fetchUsers} from '../utils/firebaseService';
import {getAuth} from '@firebase/auth';
import firebaseApp from '../../firebaseConfig';
export const useUsersData = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await fetchUsers();
      const auth = getAuth(firebaseApp);
      const userId = auth.currentUser.uid;
      const filteredUsers = fetchedUsers.filter(user => user.uid !== userId);
      const fetchedCurrentUser = await fetchCurrentUser(userId);

      setCurrentUser(fetchedCurrentUser);
      setUsers(filteredUsers);
    };
    fetchData();
  }, []);

  return {users, currentUser};
};
