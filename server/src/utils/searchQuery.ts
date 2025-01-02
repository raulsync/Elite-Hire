import { AuthRequest } from "../types";

export const buildSearchQuery = (req: AuthRequest) => {
  const keyword = req.params.query.trim || "";

  if (!keyword) {
    return {};
  }

  const searchableFields = [
    "title",
    "description",
    "requirements",
    "location",
    "jobType",
    "position",
  ];
  const searchConditions = searchableFields.map((fields) => ({
    [fields]: {
      $regex: keyword,
      $options: "i",
    },
  }));

  return {
    $or: searchConditions,
  };
};
