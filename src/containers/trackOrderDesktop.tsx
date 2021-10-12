import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { gaTracker } from '@rfg/trackers/lib/events/trackers';
import TrackOrderModes from '../components/TrackOrderModes';
import TrackOrderContent from '../context/trackOrderContext';
import { trackOrder } from '../actions';
import { MyState, MyProps } from '../types/container';
import { Context } from '../types/context';
import { StoreState } from '../types/reducer';

class TrackOrderPage extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
      mode: false,
      errorMessage: "",
    }
  }

  componentDidMount() {
    const platform: string | undefined = process.env.REACT_APP_PLATFORM;
    if (platform === "Mobile") {
      const { steps } = this.props;
      const index =  Array.isArray(steps) ? steps.map(step => step.active).lastIndexOf(true) : -1;
      const el = document.getElementById("track-order-steps") as HTMLDivElement;
      const width: number = el.clientWidth;
      const per: number = Math.round(width / 3);
      const scrollLeft: number = per * (index - 1);
      if (index > 0) {
        setTimeout(() => {
          el.scrollTo({
            top: 0,
            left: scrollLeft,
            behavior: "smooth",
          });
        }, 1000)
      }
    }
  }

  trackOrderHandler = (values, { setSubmitting, setErrors }) => {
    try {
      const { dispatch } = this.props;
      setSubmitting(true);
      const callback = response => {
        if ((response.code || response.status) === 200) {
          this.setState({ mode: true, errorMessage: "" }, () => {
            gaTracker('trackMyOrderResponse', { status: "Success" });
          });
        }
        else if ((response.code || response.status) === 422) {
          this.setState({ errorMessage: "" });
          const { errors } = (response && response.data) || {};
          if (grecaptcha) grecaptcha.execute();
          if (errors && typeof errors === "object" && Object.keys(errors).length > 0) {
						setTimeout(() => {
              setErrors(errors);
            }, 1000)
					};
          gaTracker('trackMyOrderResponse', { status: "Failed" });
        }
        else {
          const { messages } = (response && response.data) || {};
          if (messages && Array.isArray(messages) && messages[0].type === "error") {
            this.setState({ errorMessage: (messages[0].text || "Something went wrong")});
          }
          if (grecaptcha) grecaptcha.execute();
          gaTracker('trackMyOrderResponse', { status: "Failed" });
        }
        setSubmitting(false);
      }
      if (values.incrementId) values.incrementId = Number(values.incrementId);
      dispatch(trackOrder(values, callback, 1));
    } catch (error) {
      console.log("track-order", error);
    }
  }
  toggle = () => this.setState({ tooltipOpen: !this.state.tooltipOpen });
  toggleMode = () => this.setState({ mode: !this.state.mode });

  render() {
    const { tooltipOpen, mode, errorMessage } = this.state;
    const context : Context = {
      tooltipOpen,
      trackOrderHandler: this.trackOrderHandler,
      toggle: this.toggle,
      toggleMode: this.toggleMode,
      ...this.props,
      errorMessage,
    }
      return (
        <TrackOrderContent.Provider value={context} >
          <Container className="track-order-page"> 
            <TrackOrderModes {...{ mode }} />
          </Container>
        </TrackOrderContent.Provider>
    );
  }
}

const mapStateToProps = (state: StoreState):any => {
  return {
    ...state.TrackOrderReducer,
  }
};
export {
  mapStateToProps,
};
export default TrackOrderPage;