// "use client";

// import { useSession, signIn, signOut } from "next-auth/react";

// export default function Dashboard() {
//   const { data: session } = useSession();

//   if (!session) {
//     return (
//       <div>
//         <h1>You are not signed in</h1>
//         <button onClick={() => signIn("google")}>
//           Sign in with Google
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Welcome, {session.user.name}</h1>
//       <p>Email: {session.user.email}</p>
//       <img src={session.user.image} alt={session.user.name} />
//       <button onClick={() => signOut()}>Sign out</button>
//     </div>
//   );
// }
