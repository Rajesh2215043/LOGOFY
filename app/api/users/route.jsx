import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, userName } = body;

    if (!userEmail || !userName) {
      console.log("Missing required fields:", { userEmail, userName });
      return NextResponse.json(
        { error: "Email and username are required" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "users", userEmail);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("Existing user found:", userEmail);
        return NextResponse.json({
          success: true,
          message: "User already exists",
          data: userData,
        });
      }

      const userData = {
        name: userName,
        email: userEmail,
        credits: 5,
      };

      await setDoc(docRef, userData);
      console.log("New user created:", userEmail);

      return NextResponse.json({
        success: true,
        message: "User created successfully",
        data: userData,
      });
    } catch (firebaseError) {
      console.error("Firebase operation failed:", firebaseError);
      if (firebaseError.code === "permission-denied") {
        return NextResponse.json(
          {
            error: "Firebase permission denied",
            details: "Please check Firebase security rules",
            code: firebaseError.code,
          },
          { status: 403 }
        );
      }
      throw firebaseError;
    }
  } catch (error) {
    console.error("Server error in /api/users:", error);
    return NextResponse.json(
      {
        error: "Failed to process user data",
        details: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
