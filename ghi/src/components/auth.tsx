"use client"; // This is a client component
//this is just for use acroos other pages as a foundation
import { useRouter } from "next/navigation";

const router = useRouter();

const Authenticate = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:8000/auth/verify/${token}`);
    if (response.ok) {
      console.log("change this for whatver you need it from page to page");
    } else {
      localStorage.removeItem("token");
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
