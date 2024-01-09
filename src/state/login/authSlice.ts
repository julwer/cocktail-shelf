import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '../../model/apiDataTypes';

export interface AuthState {
	user: {
		email: string;
		password: string;
	};
	credentials: {
		accessToken: string;
		refreshToken: string;
		expiresIn: number;
	};
	isAuthenticated: boolean;
}

const initialState = {
	user: {
		email: '',
		password: '',
	},
	credentials: { accessToken: '', refreshToken: '', expiresIn: 0 },
	isAuthenticated: false,
} as AuthState;

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		emailChanged(state: AuthState, action: PayloadAction<string>) {
			state.user.email = action.payload;
		},
		passwordChanged(state: AuthState, action: PayloadAction<string>) {
			state.user.password = action.payload;
		},
		setCredentials: (
			state: AuthState,
			action: PayloadAction<LoginResponse>
		) => {
			state.credentials = action.payload;
			state.isAuthenticated = true;
		},
		logOut(state: AuthState, action: PayloadAction<void>) {
			state.user.email = '';
			state.user.password = '';
			state.credentials.accessToken = '';
			state.credentials.refreshToken = '';
			state.credentials.expiresIn = 0;
			state.isAuthenticated = false;
		},
	},
});

export const { passwordChanged, emailChanged, logOut, setCredentials } =
	authSlice.actions;
