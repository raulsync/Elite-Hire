import { apiClient } from "@/lib/api-client";
import { LoginInput, SignUpInput } from "@/utils/validation";

export const authService = {
  async register(data: SignUpInput) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("role", data.role);
    if (data.file) {
      formData.append("file", data.file);
    }
    const response = await apiClient.post("/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async login(data: LoginInput) {
    const response = await apiClient.post("/user/login", data);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post("/user/logout");
    return response.data;
  },

  async updateProfile(data: FormData) {
    const response = await apiClient.post("/user/profile/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiClient.get("/user/me");
    return response.data;
  },
};
