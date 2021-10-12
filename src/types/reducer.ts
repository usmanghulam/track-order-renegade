interface Steps {
    title: string;
    active: boolean;
}

export interface StoreState {
    component: string;
    reducer: string;
    orderNumber: string;
    orderDate: string;
    contact: boolean,
    status: string;
    description: string;
    steps: Array<Steps> | [];
}