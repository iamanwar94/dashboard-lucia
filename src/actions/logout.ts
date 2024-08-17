// import { validateRequest } from "@/lib/auth";

// export const logout = async () => {
//   const session = await validateRequest();

//   if (!session) {
//     return {
//       error: "unauthorized",
//     };
//   }

//   await lucia.invalidateSession(session.id);

//   const sessionCookie = lucia.createBlankSessionCookie();

//   cookies().set(
//     sessionCookie.name,
//     sessionCookie.value,
//     sessionCookie.attributes
//   );

//   return redirect("/login");
// };
