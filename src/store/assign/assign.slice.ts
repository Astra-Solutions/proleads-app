import { createSlice } from '@reduxjs/toolkit'

type AssignSlice = {
    loading: boolean,
    list: Assign[],
    error: string,
    update: {
        loading: boolean;
        errors: any[];
        message: string;
    };
    add: {
        loading: boolean;
        errors: any[];
        message: string;
    };
}

type Assign = {
    id: string;
    company_id: string,
    user_id:string,
    message: string,
    errors: any,
    loading:boolean,
};

const INITIAL_STATE :AssignSlice = {
    list: [],
    loading: false,
    error: "",
    update: {
        loading: false,
        errors: [],
        message: "",
    },
    add: {
        loading: false,
        errors: [],
        message: "",
    },
};

const assignSlice = createSlice({
    name: "assign",
    initialState: INITIAL_STATE,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        loadPending: (state) => {
            state.loading = true;
            state.list = [];
            state.error = "";
        },
        loadSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload.list;
            state.error = "";
        },
        loadFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.list = [];
        },
        updateLoading: (state) => {
            state.update.loading = true;
            state.update.errors = [];
            state.update.message = "";
        },
        updateSuccess: (state) => {
            state.update.loading = false;
            state.update.errors = [];
            state.update.message = "";
        },
        updateError: (state, action) => {
            state.update.loading = false;
            state.update.message = action.payload.message;
            state.update.errors = action.payload.errors;
        },
        addLoading: (state) => {
            state.add.loading = true;
            state.add.errors = [];
            state.add.message = "";
        },
        addSuccess: (state) => {
            state.add.loading = false;
            state.add.errors = [];
            state.add.message = "";
        },
        addError: (state, action) => {
            state.add.loading = false;
            state.add.message = action.payload.message;
            state.add.errors = action.payload.errors;
        },
    },
});


export default assignSlice;