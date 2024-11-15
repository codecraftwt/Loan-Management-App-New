import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../Utils/AxiosInstance';

// Thunk for user login
export const login = createAsyncThunk('auth/signin', async ({ emailOrMobile, password }, { rejectWithValue }) => {
    try {
        const response = await instance.post('auth/signin', { emailOrMobile, password });

        // Destructure user data and token from the response
        const { token, _id, email, userName, mobileNo, address, aadharCardNo } = response.data;

        // If token and user info are present, save to AsyncStorage
        if (token && _id) {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify({ _id, email, userName, mobileNo, address, aadharCardNo }));
            return { token, _id, email, userName, mobileNo, address, aadharCardNo };
        } else {
            return rejectWithValue('Invalid credentials');  // Handle invalid response data
        }
    } catch (error) {
        // If there is a network issue or other API issues, capture the error and pass it to rejectWithValue
        console.error('Login error:', error.response.data.message);
        if (error.response || error.response.data || error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue('Network error, please try again later.');  // Fallback error message
        }
    }
});

// Thunk for user registration
// export const registerUser = createAsyncThunk(
//     'auth/signup',
//     async (userData, { rejectWithValue }) => {
//         try {
//             const response = await instance.post('auth/signup', userData);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// Authentication slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        error: null,
        isLoading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login reducers
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.token) {
                    state.user = action.payload;
                    state.token = action.payload.token;
                } else {
                    state.error = 'Invalid email or password';
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Check your connection or try again later.';
            })

        // Register reducers
        // .addCase(registerUser.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // })
        // .addCase(registerUser.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload.user;
        // })
        // .addCase(registerUser.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload || 'Registration failed. Please try again.';
        //     console.error(action.error.message);
        // });
    },
});

// Export the logout action if needed
export const { logout } = authSlice.actions;

export default authSlice.reducer;
