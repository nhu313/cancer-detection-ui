import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "cancer-detection",
  access: (allow) => ({
    "images/*": [allow.authenticated.to(["read", "write", "delete"])],
  }),
});
