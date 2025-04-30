
import React from "react";
import HeaderMenu from "./HeaderMenu";

interface LayoutShellProps {
  children: React.ReactNode;
  user: {
    name?: string;
    email: string;
    avatarUrl?: string;
  };
  inboxes: {
    id: string;
    email: string;
    healthScore: number;
  }[];
  onSelectInbox: (id: string) => void;
  onViewProfile: () => void;
  onViewBilling: () => void;
  onLogout: () => void;
  notificationCount: number;
  onViewNotifications: () => void;
}

const LayoutShell: React.FC<LayoutShellProps> = ({
  children,
  user,
  inboxes,
  onSelectInbox,
  onViewProfile,
  onViewBilling,
  onLogout,
  notificationCount,
  onViewNotifications,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMenu
        user={user}
        inboxes={inboxes}
        onSelectInbox={onSelectInbox}
        onViewProfile={onViewProfile}
        onViewBilling={onViewBilling}
        onLogout={onLogout}
        notificationCount={notificationCount}
        onViewNotifications={onViewNotifications}
      />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutShell;
