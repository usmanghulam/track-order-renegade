import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Recaptcha from 'react-google-invisible-recaptcha';
import * as Yup from 'yup';
import Loader from '@rfg/core/lib/page/Loader';
import { FormGroup, Button, Label, Input, Tooltip } from 'reactstrap';
import TrackOrderContext from '../context/trackOrderContext';
import { ValidationReporter } from '@rfg/core/lib/page/error/FrontendErrors/ValidationReporters/ValidationReporter';
import { gaTracker } from '@rfg/trackers/lib/events/trackers';

const TrackOrderForm = () => {
    const recaptchaRef = createRef();
    return (<TrackOrderContext.Consumer>
    {({ toggle, tooltipOpen, trackOrderHandler, errorMessage }) => (
      <div className="track-order-form">
        <div className="track-order-form-header ">
          <div className="text-center">
            <h1 className="">Track My Order</h1>
            <p>Want to track the status of an order?  Enter the order number and email associated with the order to get started!</p>
          </div>
          <Formik
          initialValues={{
            email: "",
            incrementId: "",
            recaptcha: ""
          }}
          validate= {(values) => {
            const errors = {};
            const schemaRules = {
              email: Yup.string().email('Invalid Email').required("Email is required"),
              incrementId: Yup.string().required('Order Number is required'),
              recaptcha: Yup.string().required('Recaptcha is required'),
            }
            const schema = Yup.object().shape(schemaRules);
            try {
              schema.validateSync(values, { abortEarly: false });
            } catch (err) {
              err.inner.forEach((er) => { errors[er.path] = er.message; });
            }
            if (grecaptcha && Object.keys(errors).length === 1 && errors.recaptcha && !values.recaptcha) {
              grecaptcha.execute();
            }
            return errors;
          }}
          onSubmit={trackOrderHandler}
          enableReinitialize={true}
          >
            {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting, isValidating, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className={isSubmitting || isValidating ? 'form-processing' : 'form'} >
                <Loader visible={isSubmitting || isValidating} />
                <ValidationReporter errors={errors} type="supportRequestForm" />
                <FormGroup>
                  {errorMessage && <div className="errorMessage" dangerouslySetInnerHTML={{ __html: errorMessage }} />}
                  <Label for="incrementId">Order Number <em>*</em></Label>
                    <p className="font-12">
                      Where can I find my Order Number?
                        <span className="ml-2" style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">
                          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="9.5" r="9" stroke="#4285F4"/>
                            <path d="M10.0005 14.084C9.74849 14.084 9.53849 14.014 9.37049 13.874C9.21183 13.7247 9.13249 13.5147 9.13249 13.244V7.84C9.13249 7.56933 9.21183 7.364 9.37049 7.224C9.53849 7.084 9.74849 7.014 10.0005 7.014C10.2525 7.014 10.4625 7.084 10.6305 7.224C10.7985 7.364 10.8825 7.56933 10.8825 7.84V13.244C10.8825 13.5147 10.7985 13.7247 10.6305 13.874C10.4625 14.014 10.2525 14.084 10.0005 14.084ZM10.0005 5.768C9.68316 5.768 9.43116 5.684 9.24449 5.516C9.05783 5.33867 8.96449 5.11 8.96449 4.83C8.96449 4.55 9.05783 4.326 9.24449 4.158C9.43116 3.99 9.68316 3.906 10.0005 3.906C10.3085 3.906 10.5558 3.99 10.7425 4.158C10.9385 4.326 11.0365 4.55 11.0365 4.83C11.0365 5.11 10.9432 5.33867 10.7565 5.516C10.5698 5.684 10.3178 5.768 10.0005 5.768Z" fill="#4285F4"/>
                          </svg>
                        </span>
                        <Tooltip placement="top-end" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                          <img src="https://d9dvmj2a7k2dc.cloudfront.net/wysiwyg/Order_Confirmation_-_Hover.jpg" alt="" title="" />
                        </Tooltip>
                    </p>
                  <Input 
                    type="text"
                    aria-invalid={errors.incrementId && touched.incrementId ? 'true' : 'false'}
                    aria-label="Increment Id"
                    maxLength={10}
                    name="incrementId"
                    id="incrementId" 
                    placeholder=""
                    onChange={e => {
                      if (/^\d*\.?\d*$/.test(e.target.value)) handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.incrementId}
                  />
                  {errors.incrementId && touched.incrementId && <span className="form-error">{errors.incrementId}</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email Address <em>*</em></Label>
                  <Input 
                  type="email" 
                  aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                  aria-label="Email"
                  maxLength={140}
                  name="email"
                  id="email" 
                  placeholder="" 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.email} 
                  />
                  {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
                </FormGroup>
                <FormGroup>
                <Recaptcha
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_GOOGLE_INVISIBLE_RECAPTCHA_KEY}
                  onResolved={key => setFieldValue('recaptcha', (key || ""))}
                />
                </FormGroup>
                <div className="text-center">
                  <Button 
                    type="submit" 
                    className="bg-theme border-theme font-16" 
                    title="Track Order" >
                    Track Order
                  </Button>
                  <div className="font-600">
                    Can’t find the order number?  <a onClick={() => {
                      gaTracker('trackMyOrderClicked', { label: "Sign in" });
                    }} href={`${process.env.REACT_APP_BASE_URL}/customer/account/login`}>Sign in here.</a>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )}
    </TrackOrderContext.Consumer>); 
};
TrackOrderForm.propTypes = {
  toggle: PropTypes.func.isRequired,
  tooltipOpen: PropTypes.bool.isRequired,
  trackOrderHandler: PropTypes.func.isRequired,
};
TrackOrderForm.defaultProps = {
  toggle: () => {},
  tooltipOpen: false,
  trackOrderHandler: () => {},
}
export default TrackOrderForm;