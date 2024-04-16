import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithCustomToken,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdhYQSj3LVZ4TErKNqs_SXcgd--FoT5Pc",
  authDomain: "project-author-bcf01.firebaseapp.com",
  databaseURL:
    "https://project-author-bcf01-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-author-bcf01",
  storageBucket: "project-author-bcf01.appspot.com",
  messagingSenderId: "536079852223",
  appId: "1:536079852223:web:cda446a686852e5c1f5c0a",
  measurementId: "G-W5C4H3KBKZ",
};

console.log(`apiKey ${firebaseConfig.apiKey}`);
//if (process.env.NODE_ENV === "development") {
//  // Local emulator configuration
//  firebaseConfig.host = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST;
//  firebaseConfig.port = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_PORT;
//}

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
//export async function getAuthenticatedAppForUser(session = null) {
//
//
//  if (typeof window !== "undefined") {
//    // client
//    console.log("client: ", firebaseApp);
//
//    return { app: firebaseApp, user: auth.currentUser.toJSON() };
//  }
//
//  const { initializeApp: initializeAdminApp, getApps: getAdminApps } = await import("firebase-admin/app");
//
//  const { getAuth: getAdminAuth } = await import("firebase-admin/auth");
//
//  const { credential } = await import("firebase-admin");
//
//  const ADMIN_APP_NAME = "firebase-frameworks";
//  const adminApp =
//    getAdminApps().find((it: { name: string; }) => it.name === ADMIN_APP_NAME) ||
//    initializeAdminApp({
//      credential: credential.applicationDefault(),
//  }, ADMIN_APP_NAME);
//
//  const adminAuth = getAdminAuth(adminApp);
//  const noSessionReturn = { app: null, currentUser: null };
//
//
//  if (!session) {
//    // if no session cookie was passed, try to get from next/headers for app router
//    session = await getAppRouterSession();
//
//    if (!session) return noSessionReturn;
//  }
//
//  const decodedIdToken = await adminAuth.verifySessionCookie(session);
//
//  const app = initializeAuthenticatedApp(decodedIdToken.uid)
//	const auth = getAuth(app)
//
//  // handle revoked tokens
//  const isRevoked = !(await adminAuth
//    .verifySessionCookie(session, true)
//    .catch((e) => console.error(e.message)));
//  if (isRevoked) return noSessionReturn;
//
//  // authenticate with custom token
//  if (auth.currentUser?.uid !== decodedIdToken.uid) {
//    // TODO(jamesdaniels) get custom claims
//    const customToken = await adminAuth
//      .createCustomToken(decodedIdToken.uid)
//      .catch((e) => console.error(e.message));
//
//    if (!customToken) return noSessionReturn;
//
//    await signInWithCustomToken(auth, customToken);
//  }
//  console.log("server: ", app);
//  return { app, currentUser: auth.currentUser };
//}

async function getAppRouterSession() {
  // dynamically import to prevent import errors in pages router
  const { cookies } = await import("next/headers");

  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    // cookies() throws when called from pages router
    return undefined;
  }
}

function initializeAuthenticatedApp(uid: any) {
  const random = Math.random().toString(36).split(".")[1];
  const appName = `authenticated-context:${uid}:${random}`;

  const app = initializeApp(firebaseConfig, appName);

  return app;
}
