import * as constants from '../constants';

// interfaces
export interface TrackOrderInterface {
    type: constants.TRACK_MY_ORDER_ASYNC;
    payload: any;
    callback: (response: any) => void;
    noflash: number;
}

export interface TrackOrderSuccess {
    type: constants.TRACK_MY_ORDER_ASYNC_SUCCESS;
    payload: any;
}

export interface TrackOrderFailed {
    type: constants.TRACK_MY_ORDER_ASYNC_FAILED;
    response: any;
}

// actions creators
export const trackOrder = (payload: any, callback: (response: any) => void, noflash: number): TrackOrderInterface => {
    return { 
        type: constants.TRACK_MY_ORDER_ASYNC, 
        payload, 
        callback, 
        noflash 
    }
};

export const trackOrderSuccess = (payload: any) => {
    return {
        type: constants.TRACK_MY_ORDER_ASYNC_SUCCESS,
        payload,
    }
};

export const trackOrderFailed = (response: any) => {
    return {
        type: constants.TRACK_MY_ORDER_ASYNC_FAILED,
        response,
    }
};

// Create type action and put all the actions using union type check;
export type EnthusiasmAction = TrackOrderInterface | TrackOrderSuccess | TrackOrderFailed;