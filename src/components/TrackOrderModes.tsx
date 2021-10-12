import React, { FC } from 'react';
import TrackOrderSuccess from './TrackOrderSuccess';
import TrackOrderForm from './TrackOrderForm';

type Props = {
    mode: boolean;
}
const TrackOrderModes: FC<Props> = ({ mode }) => {
    if (mode) return <TrackOrderSuccess />
    else return <TrackOrderForm />
};

export default TrackOrderModes;