import React, { FC } from 'react';

type Props = {
    status: string;
    description: string;
    contact: string;
}
const TrackOrderStatus : FC<Props> = ({ status, description, contact }) => {
    return (
        <div className="track-order-status text-center">
            <h4>Order Status</h4>
            <div className="bg-white py-3">
                <h5 className="theme-color">{status}</h5>
                {description && <div className="current-status" dangerouslySetInnerHTML={{ __html: description }} />}
            </div>
        </div>
    );
};

export default TrackOrderStatus;