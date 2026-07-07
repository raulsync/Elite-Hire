import { apiClient } from "@/lib/api-client";

export const resumeService = {
  async parseResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post("/user/parse-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
