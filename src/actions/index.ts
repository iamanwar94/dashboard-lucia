import { lucia } from "@/lib/auth";
import { User } from "@/lib/db";
// import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (formData: any) => {
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    !/^[a-z0-9_-]+$/.test(username)
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

  // const validPassword = await verify(existingUser.hashed_password, password, {
  //   memoryCost: 19456,
  //   timeCost: 2,
  //   outputLen: 32,
  //   parallelism: 1,
  // });

  const validPassword = existingUser.hashed_password === password;

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
  console.log("loading => form data", formData);
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    !/^[a-z0-9_-]+$/.test(username)
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

  // const hashed_password = await hash(password);
  const userId = generateIdFromEntropySize(10);

  await User.insertOne({
    _id: userId,
    hashed_password: password,
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
