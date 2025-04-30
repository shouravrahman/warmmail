
import React, { useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

// Types for notifications
export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoDismiss?: boolean;
}

interface NotificationToastsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const NotificationToasts: React.FC<NotificationToastsProps> = ({
  notifications,
  onDismiss,
}) => {
  useEffect(() => {
    notifications.forEach((notification) => {
      const { id, type, title, message, action, autoDismiss = true } = notification;

      const Icon = type === "success" ? CheckCircle : 
                   type === "error" ? AlertCircle : 
                   Info;

      // Use the Sonner toast library
      toast[type === "error" ? "error" : 
            type === "success" ? "success" : 
            type === "warning" ? "warning" : "info"](
        title,
        {
          id,
          description: message,
          duration: autoDismiss ? 5000 : Infinity,
          icon: <Icon size={18} />,
          action: action ? {
            label: action.label,
            onClick: () => {
              action.onClick();
              toast.dismiss(id);
              onDismiss(id);
            }
          } : undefined,
          onDismiss: () => onDismiss(id),
        }
      );
    });
  }, [notifications, onDismiss]);

  // This component doesn't render anything directly
  // It just triggers the toast notifications
  return null;
};

export default NotificationToasts;
