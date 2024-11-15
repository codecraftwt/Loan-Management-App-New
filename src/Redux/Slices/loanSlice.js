import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../Utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    loans: [],
    totalAmount: 0,
    lenderLoans: [], // New state for lender-specific loans
    myLoans: [],
    lenderTotalAmount: 0, // New state for lender-specific total amount
    loading: false,
    error: null,
};

// Thunk for fetching loan details by Aadhar
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
                loans: response.data.data,
                totalAmount: response.data.totalAmount,
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

            // Force a fresh fetch with no caching (or consider adding cache-control headers)
            const response = await instance.get('loan/get-loan-by-lender', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-cache',  // Avoid caching old data
                },
            });

            if (response.status === 404 && response.data.message) {
                return rejectWithValue(response.data.message);
            }

            return {
                lenderLoans: response.data.data,
                lenderTotalAmount: response.data.totalAmount,
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
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                return rejectWithValue('User is not authenticated');
            }

            const response = await instance.post(
                'loan/add-loan',
                loanData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('API Error:', error.response.data);  // Log the detailed error
                return rejectWithValue(error.response.data);  // Return the API error to the component
            }
            console.error('Error:', error.message);  // Log non-API errors
            return rejectWithValue(error.message);  // Return the error message
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
            // Handling getLoanByAadhar
            .addCase(getLoanByAadhar.pending, (state) => {
                state.loading = true;
                // Clear previous data to avoid mixing stale data
                state.loans = [];
                state.totalAmount = 0;
            })
            .addCase(getLoanByAadhar.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload.loans;
                state.totalAmount = action.payload.totalAmount;
            })
            .addCase(getLoanByAadhar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Handling getLoanByLender
            .addCase(getLoanByLender.pending, (state) => {
                state.loading = true;
                // Clear previous data to avoid mixing stale data
                state.lenderLoans = [];
                state.lenderTotalAmount = 0;
            })
            .addCase(getLoanByLender.fulfilled, (state, action) => {
                state.loading = false;
                state.lenderLoans = action.payload.lenderLoans;
                state.lenderTotalAmount = action.payload.lenderTotalAmount;
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
                state.lenderLoans.push(action.payload);
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
