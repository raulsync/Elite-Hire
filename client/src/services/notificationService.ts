import { apiClient } from "@/lib/api-client";

export const notificationService = {
  async getNotifications() {
    const response = await apiClient.get("/notifications");
    return response.data;
  },

  async markAllAsRead() {
    const response = await apiClient.patch("/notifications/all/read");
    return response.data;
  },
};
