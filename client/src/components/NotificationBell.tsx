import {
  Bell,
  CheckCheck,
  BriefcaseBusiness,
  UserCheck,
  CalendarClock,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNotifications } from "@/hooks/useNotifications";

function NotificationBell() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application_received":
        return <UserCheck className="h-4 w-4 text-primary" />;
      case "status_update":
        return <BriefcaseBusiness className="h-4 w-4 text-violet-600" />;
      case "interview_scheduled":
        return <CalendarClock className="h-4 w-4 text-emerald-600" />;
      default:
        return <Bell className="h-4 w-4 text-zinc-500" />;
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!user) return null;

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-zinc-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
            <h3 className="font-semibold text-sm text-zinc-800">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-zinc-400">
                <Bell className="h-8 w-8 mb-2 opacity-40" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 20).map((notification) => (
                <div
                  key={notification._id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-zinc-50 last:border-b-0 transition-colors ${
                    notification.read
                      ? "bg-white"
                      : "bg-primary/5 hover:bg-primary/10"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5 p-1.5 bg-zinc-100 rounded-full">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${notification.read ? "text-zinc-600" : "text-zinc-800 font-medium"}`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
