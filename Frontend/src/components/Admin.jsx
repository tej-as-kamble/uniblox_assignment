import React, { useState } from "react";
import "./Admin.css";

const Admin = () => {
  const totalItemsPurchased = 45;
  const totalPurchaseAmount = 12500;
  const totalCouponUsed = 3;
  const totalDiscountGiven = 300;
  
  const [usersData, setUsersData] = useState([
    {
      userName: "User1",
      code: "DISC10-001",
      couponStatus: "Used",
      discountAmount: 100,
      requestStatus: "Approved",
    },
    {
      userName: "User2",
      code: "DISC10-002",
      couponStatus: "Unused",
      discountAmount: 0,
      requestStatus: "Pending",
    },
    {
      userName: "User3",
      code: "DISC10-003",
      couponStatus: "Used",
      discountAmount: 150,
      requestStatus: "Rejected",
    },
    {
      userName: "User4",
      code: "DISC10-004",
      couponStatus: "Unused",
      discountAmount: 0,
      requestStatus: "Pending",
    },
  ]);

  const handleGiveCoupon = (index) => {
    const updatedUsersData = [...usersData];
    updatedUsersData[index].requestStatus = "Approved";
    updatedUsersData[index].couponStatus = "Used";
    updatedUsersData[index].discountAmount = 100;
    setUsersData(updatedUsersData);
  };

  const handleRejectCoupon = (index) => {
    const updatedUsersData = [...usersData];
    updatedUsersData[index].requestStatus = "Rejected";
    updatedUsersData[index].couponStatus = "Unused";
    updatedUsersData[index].discountAmount = 0;
    setUsersData(updatedUsersData);
  };

  return (
    <div className="admin-container">
      <div className="stats-section">
        <div className="stat">
          <h3>Total Items Purchased</h3>
          <p>{totalItemsPurchased}</p>
        </div>
        <div className="stat">
          <h3>Total Purchase Amount</h3>
          <p>₹{totalPurchaseAmount}</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat">
          <h3>Total Coupons Used</h3>
          <p>{totalCouponUsed}</p>
        </div>
        <div className="stat">
          <h3>Total Discount Given</h3>
          <p>₹{totalDiscountGiven}</p>
        </div>
      </div>


      <div className="table-section">
        <h3>Discount Code and User Coupon Requests</h3>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Discount Code</th>
              <th>Coupon Status</th>
              <th>Discount Amount</th>
              <th>Request Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>{user.code}</td>
                <td>{user.couponStatus}</td>
                <td>₹{user.discountAmount}</td>
                <td>{user.requestStatus}</td>
                <td>
                  {user.requestStatus === "Pending" && (
                    <>
                      <button
                        onClick={() => handleGiveCoupon(index)}
                        disabled={user.requestStatus !== "Pending"}
                      >
                        Give Coupon
                      </button>
                      <button
                        onClick={() => handleRejectCoupon(index)}
                        disabled={user.requestStatus !== "Pending"}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {user.requestStatus === "Approved" && (
                    <span>Coupon Given</span>
                  )}
                  {user.requestStatus === "Rejected" && (
                    <span>Coupon Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
