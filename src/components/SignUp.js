import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './notify';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password : '',
      confirmPassword : '',
      email: '',
      checkbox :false
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      checkbox: Yup.bool().oneOf([true] , "Accept term is required"),
      password : Yup.string().min(6,"password is to short").required("password is required"),
      confirmPassword : Yup.string().oneOf([Yup.ref('password'),null], 'Password do not match').required("confirm your password")
    }),
    onSubmit: values => {
       notify("success" , "You signed up successfully");
       formik.resetForm()               
    },
  });
  const showInvalidData = () => {
     if(Object.keys(formik.errors).length > 0){
       notify("failed" , "invalid data")
     }
  }
  return (
    <div className='bg-gray-100 h-screen flex justify-center w-full items-center'>
        <form 
        onSubmit={formik.handleSubmit} 
        className='bg-white h-fit border-gray-200 border-2 rounded-lg shadow-md px-12 pb-8 pt-2 md:w-6/12 lg:w-4/12'>

          <div className='text-indigo-600 text-3xl font-bold py-8'>
              <h1>Sign Up</h1>
          </div>

         <div className='pb-4'>
             <label className='label'>Name</label>
             <input
               id="firstName" type="text" {...formik.getFieldProps('firstName')} className='inputStyle' />
             {formik.touched.firstName && formik.errors.firstName ? (
               <div className='errorMsg'>{formik.errors.firstName}</div>) : null}
         </div>

         <div className='pb-4'>
              <label  className='label'>Last Name</label>
             <input id="lastName" type="text" {...formik.getFieldProps('lastName')}  className='inputStyle' />
             {formik.touched.lastName && formik.errors.lastName ? (
               <div className='errorMsg'>{formik.errors.lastName}</div>
             ) : null}
         </div>

         <div className='pb-4'>
                <label  className='label'>Email Address</label>
             <input id="email" type="text" {...formik.getFieldProps('email')}  className='inputStyle' />
             {formik.touched.email && formik.errors.email ? (
               <div className='errorMsg'>{formik.errors.email}</div>
             ) : null}
         </div>

         <div className='pb-4'>
                <label  className='label'>Password</label>
               <input type="password" id='password' {...formik.getFieldProps('password')}  className='inputStyle' />
               {formik.touched.password && formik.errors.password ?(
                 <div className='errorMsg'>{formik.errors.password}</div>
               ) : null}
          </div> 

          <div className='pb-4'>
                <label  className='label'>Confirm Password</label>
                <input type="password" id='confirmPassword' {...formik.getFieldProps('confirmPassword')} className='inputStyle' />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ?(
                  <div className='errorMsg'>{formik.errors.confirmPassword}</div>
                ) : null}
          </div>

          <div className='py-4'>
             <div className='flex items-center'>
               <label className='font-bold text-xs mr-4' >Accept the rules</label>
               <input id='checkbox'type="checkbox" {...formik.getFieldProps('checkbox')} />
             </div>
                {formik.touched.checkbox && formik.errors.checkbox ? (
               <div className='errorMsg block'>{formik.errors.checkbox}</div>) : null}
          </div>

          <div className='flex justify-between items-center pt-4'> 
                 <Link to="/login"><button className='btn2'>Login</button> </Link> 
                  <button onClick={showInvalidData} type="submit" className='btn1'>Sign Up</button>
          </div>
      <ToastContainer />
    </form>
    </div>
  );
};
export default SignUp;