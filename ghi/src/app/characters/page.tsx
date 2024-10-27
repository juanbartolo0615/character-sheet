"use client"; // This is a client component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CharacterGrid from "@/components/characterGrid";
import { Characters } from "@/components/objectsDeclaration";

const Page = async () => {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const router = useRouter();
  const [userId, setUserId] = useState<number>(0);
  const [display, setDisplay] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Create a new character");

  const Characters = async () => {
    if (userId !== 0) {
      try {
        const response = await fetch(
          `http://localhost:8000/characters/${userId}`
        );
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
          setMessage("Create Your first Character");
        }
        setCharacters(data);
        setDisplay(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const Authenticate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/auth/verify/${token}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);

  useEffect(() => {
    Characters();
  }, [userId]);

  return (
    <>
      {display ? (
        <CharacterGrid
          characters={characters}
          message={message}
          router={router}
        />
      ) : null}
    </>
  );
};
export default Page;
