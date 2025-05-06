import React, { useState, useEffect } from 'react';
import './GetDiscount.css';

const GetDiscount = () => {
  const [hasCoupon, setHasCoupon] = useState(true); // Change to true to test coupon state
  const [couponCode, setCouponCode] = useState('SAVE20OFF');
  const [isEligibleForCoupon, setIsEligibleForCoupon] = useState(true);
  const [ordersCompleted, setOrdersCompleted] = useState(2);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrdersCompleted(2);
    checkEligibility();
  }, []);

  const checkEligibility = () => {
    if (ordersCompleted < 3) {
      setIsEligibleForCoupon(false);
    } else {
      setIsEligibleForCoupon(true);
    }
  };

  const handleCouponRequest = () => {
    alert('Coupon requested!');
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
          <h2>🎉 Congratulations!</h2>
          <p>You have unlocked a discount coupon:</p>
          <div className="coupon-box">
            <span className="coupon-code">{couponCode}</span>
            <button onClick={handleCopy} className="copy-btn">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p>Use this on your next order and save more!</p>
        </div>
      ) : isEligibleForCoupon ? (
        <div className="coupon-info">
          <h2>Almost there!</h2>
          <p>Complete 3 more orders to unlock a discount coupon.</p>
          <p>You’ve completed {ordersCompleted} orders. Keep going!</p>
        </div>
      ) : (
        <div className="coupon-info">
          <h2>Request a Coupon</h2>
          <p>Don’t have a coupon yet? Request one now!</p>
          <button onClick={handleCouponRequest} className="request-btn">
            Request Coupon
          </button>
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
