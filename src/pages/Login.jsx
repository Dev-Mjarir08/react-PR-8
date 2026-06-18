import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <form className=" mx-auto mt-5 p-4 border rounded shadow">
                        <h2 className="text-center mb-4">User Login</h2>

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
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                            >
                                Remember Me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                        <p className="text-center mt-3 mb-0">
                            Don't have an account?
                             <Link to="/register" className="ms-1 text-decoration-none">
                                Register
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login
