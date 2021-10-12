import React, { Fragment, FC } from 'react';
import TrackOrderContext from '../context/trackOrderContext';
import TrackOrderContent from './TrackOrderContent';
import TrackOrderSteps from './TrackOrderSteps';
import TrackOrderStatus from './TrackOrderStatus';
import TrackOtherOrder from './TrackOtherOrder';

const TrackOrderSuccess: FC<{}> = () => {
    return (
        <TrackOrderContext.Consumer>
            {({ toggleMode, steps, orderNumber, orderDate, contact, status, description }) => (
                <Fragment>
                    <TrackOrderContent {...{ orderNumber, orderDate }} />
                    <TrackOrderSteps {...{ steps }} />
                    <TrackOrderStatus {...{ status, description, contact }} />
                    <TrackOtherOrder {...{ toggleMode }} />
                </Fragment>
            )}
        </TrackOrderContext.Consumer>
    );
};

export default TrackOrderSuccess;