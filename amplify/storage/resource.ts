import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "cancer-detection",
  access: (allow) => ({
    'submissions/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  })
});
