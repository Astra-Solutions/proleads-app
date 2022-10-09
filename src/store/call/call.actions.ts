import { toast } from "react-toastify";
import CallService from "./call.service";
import CallSlice from "./call.slice";

const {
    addLoading,
    addSuccess,
    addError,
    loadPending,
    loadFailed,
    loadSuccess
} = CallSlice.actions;


export const addCall =
    (call: any,
        navigate:any): any =>
    async (dispatch: any) => {
        try {
            dispatch(addLoading());

            const response = await CallService.add(call);

            let data: any = null;

            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }

            if (response.ok) {
                dispatch(addSuccess());
                toast.success(data.message);
                navigate("/dashboard")
            } else {
                const error: any = {
                    message: data.message ? data.message : null,
                    errors: data.errors ? data.errors : null,
                };

                if (error.message) toast.error(error.message);
                return dispatch(addError(error));
            }
        } catch (e: any) {
            toast.error("SOMETHING_WENT_WRONG");
            return dispatch(
                addError({ message: "SOMETHING_WENT_WRONG", errors: null })
            );
        }
    };
    export const loadCalls = (
        company_id:string,
        start_date:any,
        end_date:any
    ): any => async (dispatch: any) => {
        try {
            dispatch(loadPending());
    
            const response = await CallService.getAll(company_id,start_date,end_date);
    
            let data: any = null;
    
            try {
                data = await response.clone().json();
            } catch {
                data = await response.clone().text();
            }
    
            if (response.ok) {
                dispatch(loadSuccess({ list: data.calls }));
            } else {
                dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
            }
        } catch (e: any) {
            dispatch(loadFailed({ message: "SOMETHING_WENT_WRONG" }));
        }
    };