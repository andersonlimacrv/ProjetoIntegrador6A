import { useState } from "react";
import { BsBellFill, BsBellSlashFill } from "react-icons/bs";

import { Button } from "@/components/ui/button"; 

const NotificationButton: React.FC = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const toggleNotifications = () => {
    setIsNotificationEnabled((prev) => !prev);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="ml-auto h-9 w-9"
      onClick={toggleNotifications} 
    >
      {isNotificationEnabled ? (
        <BsBellFill className="h-5 w-5" /> 
      ) : (
        <BsBellSlashFill className="h-5 w-5" /> 
      )}
      <span className="sr-only">Toggle notifications</span>
    </Button>
  );
};

export default NotificationButton;
