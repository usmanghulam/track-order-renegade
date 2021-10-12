import React, { FC } from 'react';

type Props = {
  orderNumber: string | number;
  orderDate: string;
}

const TrackOrderContent: FC<Props> = ({ orderNumber, orderDate }) => {
  return (
    <div className="track-order-content">
      <div className="track-order-content-header d-flex justify-content-between align-items-center">
        <div className="order-number">
          <p>Order #:</p>
          <p>{orderNumber}</p>
        </div>
        <div className="track-title">
          <h2>Order Tracking</h2>
        </div>
        <div className="order-date">
          <p>Order Date:</p>
          <p>{orderDate}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderContent;