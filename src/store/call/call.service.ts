import { apiCall } from "../../utils/api";

const API_URI = process.env.REACT_APP_API_URI || 'http://localhost:3001/api';

export default class CallService {
    static add(call: any): Promise<Response> {
        return apiCall(API_URI + "/call", call, "POST", true);
    };

    static getAll(company_id:string,start_date:any,end_date:any) : Promise<Response> {
        return apiCall(API_URI + "/call",{company_id,start_date,end_date},"GET",true)
    };
}