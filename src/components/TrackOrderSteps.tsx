import React, { FC } from 'react';

type Steps = {
  title: string;
  active: boolean;
}

type Props = {
  steps: Array<Steps>;
};

const TrackOrderSteps: FC<Props> = (props) => {
  const index = props.steps.map(step => step.active).lastIndexOf(true);
  const platform = process.env.REACT_APP_PLATFORM;
  const stepsList = props.steps.map(({ title, active }, i) => (
    <li className={active && "active"} key={i}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="20" cy="20" r="20" fill="#D8D9DE"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.134 29.5797L16.1257 29.588L13.2972 26.7596L13.3055 26.7513L7 20.4457L9.82843 17.6173L16.134 23.9229L30.0568 10L32.8853 12.8284L18.9624 26.7513L18.97 26.7589L16.1416 29.5873L16.134 29.5797Z" fill="white"/> </svg>
      <p>{title}</p>
    </li>
  ));
  const StepStatus = () => {
    if (index >=0 && platform === "Mobile") {
      return <div className="current-status text-center">{props.steps[index].title} </div>
    }
    return null;
  }
  return (
    <div className="track-order-steps" id="track-order-steps" >
        <StepStatus/>
        <ul className="d-flex">
          {stepsList}
        </ul>
    </div>
  );
};

export default TrackOrderSteps;