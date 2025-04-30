
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";

interface HeaderMenuProps {
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

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  user,
  inboxes,
  onSelectInbox,
  onViewProfile,
  onViewBilling,
  onLogout,
  notificationCount,
  onViewNotifications,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-blue-600">InboxWarm</h1>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Inboxes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {inboxes.map((inbox) => (
                    <li key={inbox.id}>
                      <NavigationMenuLink asChild>
                        <Button 
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => onSelectInbox(inbox.id)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{inbox.email}</span>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              {inbox.healthScore}%
                            </span>
                          </div>
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <li className="mt-2 pt-2 border-t">
                    <NavigationMenuLink asChild>
                      <Button 
                        variant="outline"
                        className="w-full"
                      >
                        Add New Inbox
                      </Button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative"
          onClick={onViewNotifications}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onViewBilling}
        >
          Billing
        </Button>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 w-9 rounded-full p-0">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name || user.email} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 font-medium h-9 w-9 rounded-full flex items-center justify-center">
                    {user.name ? getInitials(user.name) : user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-56 p-2">
                  <li className="p-2 text-sm border-b mb-2">
                    <div className="font-medium">{user.name || 'User'}</div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={onViewProfile}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </li>
                  <li className="mt-2 pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default HeaderMenu;
