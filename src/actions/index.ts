import { lucia } from "@/lib/auth";
import { connectToDatabase, User } from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const login = async (formData: any) => {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3
    // !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "invalid username",
    };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || username.length < 6) {
    return {
      error: "invalid password",
    };
  }

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return {
      error: "invalid username or password",
    };
  }
  const validPassword = await bcrypt.compare(
    password,
    existingUser.hashed_password
  );

  if (!validPassword) {
    return {
      error: "invalid username or password",
    };
  }

  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
};

export const signup = async (formData: any) => {
  "use server";

  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    username.length < 3
    // !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "invalid username",
    };
  }

  if (typeof password !== "string" || username.length < 6) {
    return {
      error: "invalid password",
    };
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return {
      error: "user already exists",
    };
  }

  const hashed_password = await bcrypt.hash(password, 10);
  const userId = generateIdFromEntropySize(10);

  await User.insertOne({
    _id: userId,
    hashed_password,
    username,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
};
