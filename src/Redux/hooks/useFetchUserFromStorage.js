import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../Slices/authslice';

const useFetchUserFromStorage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        // Only fetch the user if it's not already in Redux
        if (!user) {
            const fetchUser = async () => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    const userData = await AsyncStorage.getItem('user');

                    if (token && userData) {
                        const parsedUser = JSON.parse(userData);
                        console.log("User Deatails fetched from the storage hook");

                        // Dispatch the setUser action to update the Redux store
                        dispatch(setUser(parsedUser));
                    }
                } catch (error) {
                    console.error('Error fetching user from AsyncStorage:', error);
                }
            };

            fetchUser();
        }
    }, [user, dispatch]); // Only run the effect if `user` is not available
};

export default useFetchUserFromStorage;
