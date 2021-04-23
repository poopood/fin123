// import {
//   useEffect,
//   useState,
//   useContext,
//   createContext,
//   FunctionComponent,
// } from "react";
// import { useRouter } from "next/router";
// import firebase from "firebase/app";
// import "firebase/auth";
// import initFirebase from "../firebase/firebase";
// import { removeTokenCookie, setTokenCookie } from "../utils/tokenCookies";


// initFirebase();

// const AuthContext = createContext({
//   user: null,
//   logout: () => null,
//   authenticated: false,
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   const logout = () => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         router.push("/");
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };

//   useEffect(() => {
//     const cancelAuthListener = firebase
//       .auth()
//       .onIdTokenChanged(async (user) => {
//         if (user) {
//           const token = await user.getIdToken();
//           setTokenCookie(token);
//           setUser(user);
//         } else {
//           removeTokenCookie();
//           setUser(null);
//         }
//       });

//     return () => {
//       cancelAuthListener();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// export function useAuth() {
//   return useContext(AuthContext);
// }