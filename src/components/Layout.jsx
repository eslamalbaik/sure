import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  // تحقق إذا كنت في صفحة NotFound
  const hideLayout = location.pathname === '/notfound';

  return (
    <>
      {!hideLayout && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
