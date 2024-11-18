import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../Slices/authslice';


const useFetchUserFromStorage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const fetchUser = async () => {
            // If user already exists in Redux, no need to fetch again
            if (user) return;

            try {
                const token = await AsyncStorage.getItem('token');
                const userData = await AsyncStorage.getItem('user');

                if (token && userData) {
                    const parsedUser = JSON.parse(userData);
                    console.log(parsedUser, "Parsed user");

                    // Dispatch the setUser action to update the Redux store
                    dispatch(setUser(parsedUser));
                }
            } catch (error) {
                console.error('Error fetching user from AsyncStorage:', error);
            }
        };

        fetchUser();
    }, [user, dispatch]);

};

export default useFetchUserFromStorage;
