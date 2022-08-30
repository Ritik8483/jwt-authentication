import { MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../feature/authSlice";
import { useAppDispatch } from "../hooks/hooks";
import { useLoginUserMutation, useRegisterUserMutation } from "../service/AuthApi";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const [showRegister, setShowRegister] = useState(false);
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [registerUser,{data:registerData,isSuccess:isRegisterSuccess,isError:isRegisterError,error:registerError}]=useRegisterUserMutation();

  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const inputEvent = (event: any) => {
    console.log("inputEvent", event);
    const name = event.target.name;
    const value = event.target.value;
    setFormValue((last) => {
      return {
        ...last,
        [name]: value,
      };
    });
  };
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill all the inputs");
    }
  };
  const handleRegister=async()=>{
    if(password !== confirmPassword){
        toast.error("Password don't match");
    }
    if(firstName && lastName && password && email){
        await registerUser({firstName,lastName,email,password});
    }
  }
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User logged in successfully!");
      dispatch(setUser({token:loginData.token,name:loginData.result.name}))
      navigate("/dashboard");
    }
    if (isRegisterSuccess) {
        toast.success("User register successfully!");
        dispatch(setUser({token:registerData.token,name:registerData.result.name}))
        navigate("/dashboard");
      }
  }, [isLoginSuccess,isRegisterSuccess]);

  useEffect(()=>{
    if(isLoginError){
      toast.error((loginError as any).data.message);
    }
    if(isRegisterError){
      toast.error((isRegisterError as any).data.message);
    }
  },[isLoginError,isRegisterError]);

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-body p-4 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      {!showRegister ? "Login" : "Register"}
                    </h2>
                    <p className="text-white-50 mb-4">
                      {!showRegister
                        ? "Please enter your Email and Password"
                        : "Please enter user detail"}
                    </p>
                    {showRegister && (
                      <>
                        <div className="form-outline form-white mb-4">
                          <MDBInput
                            type="text"
                            name="firstName"
                            value={firstName}
                            label="First Name"
                            onChange={inputEvent}
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="form-outline form-white mb-4">
                          <MDBInput
                            type="text"
                            name="lastName"
                            value={lastName}
                            label="Last Name"
                            onChange={inputEvent}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </>
                    )}
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        onChange={inputEvent}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={inputEvent}
                        className="form-control form-control-lg"
                      />
                    </div>
                    {showRegister && (
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          label="Confirm Password"
                          onChange={inputEvent}
                          className="form-control form-control-lg"
                        />
                      </div>
                    )}
                    {!showRegister ? (
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="button"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="button"
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                    )}
                  </div>
                  <div className="">
                    <h5 className="mb-0 mt-6">
                      {!showRegister ? (
                        <>
                          Don't have an account ?
                          <p
                            className="text-white-50 fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowRegister(true)}
                          >
                            Sign up
                          </p>
                        </>
                      ) : (
                        <>
                          Already have an account ?
                          <p
                            className="text-white-50 fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowRegister(false)}
                          >
                            Sign in
                          </p>
                        </>
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
