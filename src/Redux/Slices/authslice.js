// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import instance from '../../Utils/AxiosInstance';

// export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
//   try {
//     const response = instance.get(`api/notification`);
//     await AsyncStorage.setItem('token',response.data.token.token)
//     await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });

// const authslice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     error: null,
//     isLoading: false,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(login.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (action.payload.success) {
//           state.user = action.payload.data;
//         } else {
//           state.error = 'Invalid email or password';
//         }
//       })
//       .addCase(login.rejected, (state) => {
//         state.isLoading = false;
//         state.error = 'Check your connection ';
//       })
//   },
// });

// export default authslice.reducer;
