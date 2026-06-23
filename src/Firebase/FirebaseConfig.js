import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Only the URL is strictly needed to stream public database data
const firebaseConfig = {
  databaseURL: "https://star-65950-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);