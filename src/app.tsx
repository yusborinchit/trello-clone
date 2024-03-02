import { useState } from "react";
import { type Board } from "./types";

export default function App() {
  const [boards, setBoards] = useState<Board[]>([]);

  return (
    <>
      <header className="p-4">
        <h1 className="flex gap-2 text-2xl leading-[1]">
          <span className="font-bold">Hello World</span>
          <span>from</span>
          <span className="font-bold text-orange-600">TrelloClone</span>
        </h1>
      </header>
      <main className="px-4">This is the body of the page.</main>
    </>
  );
}
