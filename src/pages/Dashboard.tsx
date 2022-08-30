import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, selectAuth } from "../feature/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const Dashboard = () => {
    const {name}=useAppSelector(selectAuth);
    const dispatch=useAppDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch(logout());
        toast.success('User logged out successfully');
        navigate('/auth');
    }
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
                        Welcome to Dashboard
                    </h2>
                    <h4>Name: {name}</h4>
                    <button className="btn btn-outline-light btn-lg px-5 mt-3" type="button" onClick={()=>handleLogout()}>
                        Logout
                    </button>
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

export default Dashboard;
