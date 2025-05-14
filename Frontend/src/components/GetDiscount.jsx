import React, { useState, useEffect } from 'react';
import './GetDiscount.css';

const GetDiscount = () => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCoupon, setIsCoupon] = useState(false);
  const [isEligibleForCoupon, setIsEligibleForCoupon] = useState(false);
  const [ordersCompleted, setOrdersCompleted] = useState(0);
  const [remainingOders, setRemainingOders] = useState(0);
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/coupon-status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch coupon status');
      }

      const data = await response.json();
      console.log(data);

      if (data.coupon === 0) {
        if (data.remaining !== 0) {
          setHasCoupon(false);
          setIsEligibleForCoupon(false);
          setOrdersCompleted(data.orderCount);
          setRemainingOders(data.remaining);
        } else {
          setHasCoupon(false);
          setIsEligibleForCoupon(true);
        }
      } else if (data.coupon === 1 && data.isCoupon === 1) {
        setHasCoupon(true);
        setCouponCode(data.discountCode);
        setIsCoupon(true);
      } else if (data.coupon === 1 && data.isCoupon === 0) {
        setHasCoupon(true);
        setIsEligibleForCoupon(false);
        setIsCoupon(false);
      }


    } catch (error) {
      console.error('Error fetching coupon status:', error);
    }
  };

  const handleCouponRequest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/create-coupon', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        getStatus();
      } else {
        alert(result.message || 'Coupon request failed');
      }
    } catch (error) {
      console.error('Error requesting coupon:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="coupon-status-container">
      {hasCoupon ? (
        <div className="coupon-info">
          {isCoupon ? (
        <>
          <h2>🎉 Congratulations!</h2>
          <p>You have unlocked a discount coupon:</p>
          <div className="coupon-box">
            <span className="coupon-code">{couponCode}</span>
            <button onClick={handleCopy} className="copy-btn">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p>Use this on your next order and save more!</p>
        </>
      ) : (
        <>
          <h2>Verification pending</h2>
          <p>You have requested a discount coupon. ✅</p>
          <p>Your request is currently <strong>pending verification</strong> by our team.</p>
        </>
      )}
        </div>
      ) : isEligibleForCoupon ? (
        <div className="coupon-info">
          <h2>Request a Coupon</h2>
          <p>Don’t have a coupon yet? Request one now!</p>
          <button onClick={handleCouponRequest} className="request-btn">
            Request Coupon
          </button>
        </div>
      ) : (
        <div className="coupon-info">
          <h2>Coupon Status</h2>
          <p>Complete {remainingOders} more orders to unlock a discount coupon.</p>
          <p>You’ve completed {ordersCompleted} orders. Keep going!</p>
        </div>
      )}


      <div className="extra-info">
        <h3>*Bonus Info:</h3>
        <ul>
          <li>Coupons are valid for 30 days.</li>
          <li>Complete at least 5 orders to unlock special rewards.</li>
          <li>Check your email for exclusive offers.</li>
        </ul>
      </div>
    </div>
  );
};

export default GetDiscount;
