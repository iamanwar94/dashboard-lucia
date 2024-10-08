import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

connectToDatabase();

export const db = client.db();
export const User = db.collection("users") as Collection<UserDoc>;
export const Session = db.collection("sessions") as Collection<SessionDoc>;

export const adapter = new MongodbAdapter(Session, User);

interface UserDoc {
  _id: string;
  hashed_password: string;
  username: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}
