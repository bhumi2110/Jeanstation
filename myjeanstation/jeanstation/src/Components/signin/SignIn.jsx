import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      role: Yup.string()
        .oneOf(['Admin', 'User'], 'Invalid Role')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5055/api/SignIn', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('authToken', data.token); // Storing  token in local storage
          alert('Sign-in successful');
          console.log(data.token);

          // Navigate based on role
          if (values.role === 'Admin') {
            navigate('/admin');
          } else if (values.role === 'User') {
            navigate('/');
          }
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server');
      }
    },
  });

  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="" label="Select role" />
            <option value="Admin" label="Admin" />
            <option value="User" label="User" />
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="text-danger">{formik.errors.role}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary mt-3">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
