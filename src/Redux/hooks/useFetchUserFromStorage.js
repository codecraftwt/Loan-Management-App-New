
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../Slices/authslice';


const useFetchUserFromStorage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Retrieve token and user data from AsyncStorage
                const token = await AsyncStorage.getItem('token');
                const user = await AsyncStorage.getItem('user');

                if (token && user) {
                    const parsedUser = JSON.parse(user);
                    dispatch(login({ ...parsedUser, token }));
                }
            } catch (error) {
                console.error('Error fetching user from AsyncStorage:', error);
            }
        };

        fetchUser();
    }, [dispatch]);

};

export default useFetchUserFromStorage;
