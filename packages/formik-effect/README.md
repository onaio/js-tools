# Formik Effect

Declarative Formik component for side-effects. Use with caution. Please. I. beg. you.

```sh
yarn add @onaio/formik-effect --save
```

Note: this has peer dependencies of react, and formik.

## The Problem

Formik is an uncontrolled component. However, there are times when you want to trigger a side effect based on a state change. By design, Formik does not expose a prop for you to do this because I'm terrified as to how it would be abused--it encourages people to attempt to "sync" Formik's state in elsewhere (cough like in a Redux store cough cough). Anyways, please don't do that. You never ever ever ever want to store the same state in 2 places in a React application because it is almost impossible to keep them in sync unless you are a goddamn jedi. You may think it's working, and high five a teammate, but you are a just a lifecycle method away from lots and lots of pain and I can guarantee you are not considering all the edge cases. Sooooo....

**SAY IT WITH ME**:

**"I WILL NOT USE THIS TO STORE FORMIK STATE ELSEWHERE IN MY APP."**

**"I WILL NOT USE THIS TO STORE FORMIK STATE ELSEWHERE IN MY APP."**

**"I WILL NOT USE THIS TO STORE FORMIK STATE ELSEWHERE IN MY APP."**

## Basic Usage

Import the <FormikEffect> component and put it inside any Formik form. It renders null! Pass it an onChange() function and it will be called whenever your Formik form's state updates.

```tsx
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { FormikEffect } from '@onaio/formik-effect';


export const Signup = () =>
  <div>
    <h1>My Cool Form with a SideEffect</h1>
    <Formik
      onSubmit={values => console.log(values)}
      initialValues={{ firstName: '', lastName: '', email: '' }}
      render={props =>
        <Form className="whatever">
          <FormikEffect onChange={(currentFormikState, nextFormikState) => {
               // do whatevs
               // FYI if you alter state it will cause another render
            }};
          />
          <Field name="firstName" placeholder="First Name" />
          <Field name="lastName" placeholder="Last Name" />
          <Field name="email" type="email" placeholder="Email Address" />
          <button type="submit">Submit</button>
        </Form>}
    />
  </div>;
```

## API

Only one!

> **onChange: (currentState: FormikState<Values>, nextState: FormikState<Values>) => void**

Put your side effect here.

FormikState includes:

- values
- errors
- touched
- isSubmitting

## Inspiration

This package was inspired by, and builds heavily on, the [original formik-effect package](https://github.com/jaredpalmer/formik-effect) written by Jared Palmer.
