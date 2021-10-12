import { TRACK_MY_ORDER_ASYNC_SUCCESS } from '../constants'
import { EnthusiasmAction } from '../actions'
import { StoreState } from '../types/reducer';

const initialState = {
    component: '',
    reducer: '',
    orderNumber: '',
    orderDate: '',
    contact: false,
    status: '',
    description: '',
    steps: []
};

const TrackOrderReducer = (state: StoreState = initialState, action: EnthusiasmAction): StoreState => {
    switch (action.type) {
        case TRACK_MY_ORDER_ASYNC_SUCCESS:
            return {
                ...state,
                ...(action.payload 
                    && action.payload.data 
                    && action.payload.data.content 
                    && action.payload.data.content.orderTracking || {}),
            }
        default:
            return state;
    }
}

export default TrackOrderReducer;