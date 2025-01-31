import React from 'react';
import Image from 'next/image';
import './profilepage.css';
import ProfileCard from '@/components/ProfileCard';

const Page: React.FC = () => {
  return (
    <>
    <div className="profilepage">
      <div className="leftsection">
        <ProfileCard />
      </div>

      <div className="rightsection">
        <main className="containerprofile">
          <h1>Your Buying Orders</h1>
          <div className="orders">
            <div className="order">
              <h2>Order #1</h2>
              <p>Details about this order go here.</p>
              <a href="#" className="btn">View Order</a>
            </div>
            <div className="order">
              <h2>Order #2</h2>
              <p>Details about this order go here.</p>
              <a href="#" className="btn">View Order</a>
            </div>
          </div>
        </main>
      </div>
    </div>
    <footer>
    <p>&copy; 2024 Fiverr. All rights reserved.</p>
  </footer>
  </>

  );
};

export default Page;
