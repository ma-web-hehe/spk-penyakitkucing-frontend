
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/Sidebar1';
import FloatingButton from '../components/FloatingButton';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
              <FloatingButton />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
