import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";
import type { Schema } from "../amplify/data/resource";

// Generating the client
const client = generateClient<Schema>({
  authMode: "apiKey",
});

// Create the API record:
const response = await client.models.Song.create({
  name: `My first song`,
});

const song = response.data;

if (!song) return;

// Upload the Storage file:
const result = await uploadData({
  path: `images/${song.id}-${file.name}`,
  data: file,
  options: {
    contentType: "image/png", // contentType is optional
  },
}).result;

// Add the file association to the record:
const updateResponse = await client.models.Song.update({
  id: song.id,
  coverArtPath: result?.path,
});

const updatedSong = updateResponse.data;

setCurrentSong(updatedSong);

// If the record has no associated file, we can return early.
if (!updatedSong.coverArtPath) return;

// Retrieve the file's signed URL:
const signedURL = await getUrl({ path: updatedSong.coverArtPath });
