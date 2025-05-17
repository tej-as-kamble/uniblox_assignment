import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [totalItemsPurchased, setTotalItemsPurchased] = useState(0);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalCouponUsed, setTotalCouponUsed] = useState(0);
  const [totalDiscountGiven, setTotalDiscountGiven] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStats();
    fetchCoupons();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://uniblox-assignment.onrender.com/api/admin/purchase-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      
      setTotalItemsPurchased(data.totalItemsPurchased);
      setTotalPurchaseAmount(data.totalPurchaseAmount);
      setTotalCouponUsed(data.totalCouponsUsed);
      setTotalDiscountGiven(data.totalDiscountGiven);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://uniblox-assignment.onrender.com/api/admin/coupons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsersData(data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGiveCoupon = async (index) => {
    const couponId = usersData[index]._id;
    try {
      setLoading(true);
      await fetch(`https://uniblox-assignment.onrender.com/api/admin/coupons-accept/${couponId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCoupons(); // refresh list
    } catch (err) {
      console.error("Error approving coupon:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectCoupon = async (index) => {
    const couponId = usersData[index]._id;
    try {
      setLoading(true);
      await fetch(`https://uniblox-assignment.onrender.com/api/admin/coupons-reject/${couponId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCoupons(); // refresh list
    } catch (err) {
      console.error("Error rejecting coupon:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
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
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.discountCode}</td>
                <td>{user.couponStatus === 1 ? "Used" : "Unused"}</td>
                <td>₹{user.discountAmount}</td>
                <td>
                  {user.requestStatus === 1
                    ? "Approved"
                    : user.requestStatus === -1
                    ? "Rejected"
                    : "Pending"}
                </td>
                <td>
                  {user.requestStatus === 0 && (
                    <>
                      <button onClick={() => handleGiveCoupon(index)}>
                        Give Coupon
                      </button>
                      <button onClick={() => handleRejectCoupon(index)}>
                        Reject
                      </button>
                    </>
                  )}
                  {user.requestStatus === 1 && <span>Coupon Given</span>}
                  {user.requestStatus === -1 && <span>Coupon Rejected</span>}
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
