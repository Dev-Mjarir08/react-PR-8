import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <form className=" mx-auto mt-5 p-4 border rounded shadow">
                        <h2 className="text-center mb-4">User Registration</h2>

                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Create a password"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                            />
                            <label className="form-check-label" htmlFor="terms">
                                I agree to the Terms & Conditions
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100"
                        >
                            Register
                        </button>

                        <p className="text-center mt-3 mb-0">
                            Already have an account?
                            <Link to="/login" className="ms-1 text-decoration-none">
                                Login
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register
