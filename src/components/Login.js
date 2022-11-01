import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './notify';
import { Link } from 'react-router-dom';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      password : '',
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password : Yup.string().min(6,"password is to short").required("password is required"),
    }),
    onSubmit: values => {
       notify("success" , "you have successfully logged in");
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
      className='bg-white h-fit border-gray-200 border-2 rounded-lg shadow-md px-12 pb-8 pt-2  md:w-6/12 lg:w-4/12'>

      <div className='text-indigo-600 text-3xl font-bold py-8'>
          <h1>Login</h1>
      </div>

     <div className='pb-4'>
          <label  className='label'>Email Address</label>
         <input id="email" type="text" {...formik.getFieldProps('email')}  className='inputStyle py-1' />
         {formik.touched.email && formik.errors.email ? (
           <div className='errorMsg'>{formik.errors.email}</div>
         ) : null}
     </div>

     <div className='pb-4'>
            <label  className='label'>Password</label>
           <input type="password" id='password' {...formik.getFieldProps('password')}  className='inputStyle py-1' />
           {formik.touched.password && formik.errors.password ?(
             <div className='errorMsg'>{formik.errors.password}</div>
           ) : null}
      </div> 

      <div className='flex justify-between items-center pt-4'> 
             <Link to="/signup"><button className='btn2'>Sign Up</button> </Link> 
              <button onClick={showInvalidData} type="submit" className='btn1'>Login</button>
      </div>
  <ToastContainer />
</form>
</div>
  );
};
export default Login;