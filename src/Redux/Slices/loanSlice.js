import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../Utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    loans: [],
    totalAmount: 0,
    loading: false,
    error: null,
};

// Thunk for fetching loan details by ID with the token
export const fetchLoans = createAsyncThunk(
    'loans/fetchLoans',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                return rejectWithValue('User is not authenticated');
            }

            const response = await instance.get('loan/get-loan', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//thunk for fetching loan details by Aadhar
export const getLoanByAadhar = createAsyncThunk(
    'loans/getLoanByAadhar',
    async (aadhaarNumber, { rejectWithValue }) => {
        try {
            const response = await instance.get(`loan/get-loan-by-aadhar`, {
                params: { aadhaarNumber },
            });

            if (response.status === 404 && response.data.message) {

                return rejectWithValue(response.data.message);
            }
            return {
                loans: response.data.data,       // loan data array
                totalAmount: response.data.totalAmount,  // total loan amount
            };

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk for fetching loans by lender
export const getLoanByLender = createAsyncThunk(
    'loans/getLoanByLender',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                return rejectWithValue('User is not authenticated');
            }

            const response = await instance.get('loan/get-loan-by-lender', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 404 && response.data.message) {
                return rejectWithValue(response.data.message);
            }

            return {
                loans: response.data.data,
                totalAmount: response.data.totalAmount,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for creating a new loan
export const createLoan = createAsyncThunk(
    'loans/createLoan',
    async (loanData, { rejectWithValue }) => {
        try {
            const response = await instance.post('loan/create-loan', loanData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for updating a loan status
export const updateLoanStatus = createAsyncThunk(
    'loans/updateLoanStatus',
    async ({ loanId, status }, { rejectWithValue }) => {
        try {
            const response = await instance.patch(`loan/update-loan-status/${loanId}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const loanSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handling fetchLoans
            .addCase(fetchLoans.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLoans.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload;
            })
            .addCase(fetchLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Handling getLoanByAadhar
            .addCase(getLoanByAadhar.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLoanByAadhar.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload.loans; // Set loan data
                state.totalAmount = action.payload.totalAmount; // Set totalAmount
            })
            .addCase(getLoanByAadhar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Handling getLoanByLender
            .addCase(getLoanByLender.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLoanByLender.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload.loans; // Set loan data
                state.totalAmount = action.payload.totalAmount; // Set totalAmount
            })
            .addCase(getLoanByLender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Handling createLoan
            .addCase(createLoan.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLoan.fulfilled, (state, action) => {
                state.loading = false;
                state.loans.push(action.payload);
            })
            .addCase(createLoan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Handling updateLoanStatus
            .addCase(updateLoanStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLoanStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedLoanIndex = state.loans.findIndex(
                    (loan) => loan._id === action.payload._id
                );
                if (updatedLoanIndex >= 0) {
                    state.loans[updatedLoanIndex] = action.payload;
                }
            })
            .addCase(updateLoanStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default loanSlice.reducer;
