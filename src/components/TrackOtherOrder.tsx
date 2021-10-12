import React, { FC } from 'react';
import { gaTracker } from '@rfg/trackers/lib/events/trackers';

type Props = {
  toggleMode: () => void;
}

const TrackOtherOrder: FC<Props> = ({ toggleMode }) => {
  return (
    <div className="track-another-order text-center">
        <h6>Want to Track Another Order?</h6>
        <button onClick={() => {
          toggleMode();
          gaTracker('trackMyOrderClicked', { label: "Track Order" });
        }} 
        className="btn btn-outline-secondary">
        Track Order
        </button>
    </div>
  );
};

export default TrackOtherOrder;