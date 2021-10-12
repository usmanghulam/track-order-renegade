import { StoreState } from './reducer';

export interface MyState {
    tooltipOpen: boolean;
    mode: boolean;
    errorMessage: string;
}

export interface MyProps extends StoreState {
    mapStateToProps: any
    dispatch: any;
}