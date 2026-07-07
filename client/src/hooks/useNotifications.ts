import { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notificationService";
import { io, Socket } from "socket.io-client";
import type { Notification } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useNotifications = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  const { data } = useQuery<{ success: boolean; data: Notification[]; unreadCount: number }>({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getNotifications(),
    enabled: !!user,
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: (oldData.data || []).map((n: any) => ({ ...n, read: true })),
          unreadCount: 0,
        };
      });
    },
  });

  useEffect(() => {
    if (!user) return;

    const socket = io(
      import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
        "http://localhost:7777",
      {
        query: { userId: user._id },
        withCredentials: true,
      },
    );
    socketRef.current = socket;

    socket.on("notification:new", (notification: Notification) => {
      queryClient.setQueryData(["notifications"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [notification, ...(oldData.data || [])],
          unreadCount: (oldData.unreadCount || 0) + 1,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user, queryClient]);

  return {
    notifications: data?.data || [],
    unreadCount: data?.unreadCount || 0,
    markAllAsRead: () => markAllAsReadMutation.mutate(),
  };
};
