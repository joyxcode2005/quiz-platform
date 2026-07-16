import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Sidebar />
      <div className="md:ml-20 lg:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pb-24 md:pb-12">
          {children}
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};