import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const CustomInput = ({ field, form, ...props }) => {
  return (
    <div className="form-group">
      <label> {field.name} </label>
      <input {...field} {...props} type="text" className="form-control" />
    </div>
  )
}

const CustomError = (props) => {
  return(
    <div className="text-danger">
      { props.children }
    </div>
  )
}


class App extends Component {


  userSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Trop court').max(10, 'Trop long').required('required'),
    email: Yup.string().email('mauvais email').required('required email'),
    password: Yup.string().min(5, 'Trop court')
  })

  submit = (values, actions) => {
    console.log(values);
    // console.log(actions);
    actions.setSubmitting(false);
  }

  render() {
   return (
    <div className="container-fluid p-5 bg-light d-flex flex-column justify-content-center align-items-center">
      
      <Formik
        onSubmit={this.submit}
        initialValues={ { name:'', email:'', password:'' } }
        validationSchema={this.userSchema}
        // validateOnBlur={true} //passer à false pour changer la validation dynamique des champs input
        // validateOnChange={true} //passer à false pour changer la validation dynamique des champs input
      >
        { ({
          handleChange, 
          handleBlur, 
          handleSubmit, 
          values, 
          isSubmitting, 
          errors,
          touched
        }) => (
          <form onSubmit={handleSubmit} className="bg-white p-5 d-flex flex-column">
            
            <Field name='name' component={ CustomInput } />
            <ErrorMessage name="name" component={ CustomError } />

            <Field name='email' type="email" component={ CustomInput } />
            <ErrorMessage name="email" component={ CustomError } />
            
            <Field name='password' type="password" component={ CustomInput } />
            <ErrorMessage name="password" component={ CustomError } />

            <button type="submit" className="btn btn-small btn-primary" disables={isSubmitting}>Envoyer</button>
          </form>
        )}
      </Formik>
    </div>
   )
  }
 }
 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
