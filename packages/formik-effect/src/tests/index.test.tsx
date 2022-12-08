import { mount } from 'enzyme';
import flushPromises from 'flush-promises';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import FormikEffect from '..';

describe('formik-effect', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('works as expected', async () => {
    const mock = jest.fn();

    const SignupForm = () => (
      <div>
        <h1>My Cool Form with a SideEffect</h1>
        {/* tslint:disable jsx-no-lambda */}
        <Formik onSubmit={jest.fn()} initialValues={{ firstName: '', lastName: '', email: '' }}>
          {() => (
            <Form translate="yes">
              <FormikEffect onChange={mock} />
              <Field id="firstName" name="firstName" placeholder="First Name" />
              <Field id="lastName" name="lastName" placeholder="Last Name" />
              <Field name="email" type="email" placeholder="Email Address" />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        {/* tslint:enable jsx-no-lambda */}
      </div>
    );

    const wrapper = mount(<SignupForm />);

    wrapper
      .find('Form Field#firstName')
      .simulate('change', { target: { value: 'John', name: 'firstName' } });
    wrapper
      .find('Form #lastName')
      .last()
      .simulate('change', { target: { value: 'Doe', name: 'lastName' } });

    await flushPromises();
    wrapper.update();

    expect(mock).toHaveBeenCalledTimes(5);

    expect(mock.mock.calls[2]).toMatchSnapshot();
  });
});
