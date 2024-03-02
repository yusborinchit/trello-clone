import { type DragEvent, useState } from "react";
import { type Uuid, type Board } from "./types";

const DEFAULT_BOARDS = [
  {
    id: crypto.randomUUID(),
    title: "To Do",
    tasks: [
      { id: crypto.randomUUID(), name: "Make a Trello Clone" },
      { id: crypto.randomUUID(), name: "Host the website" },
    ],
  },
  { id: crypto.randomUUID(), title: "On Progress", tasks: [] },
  { id: crypto.randomUUID(), title: "Completed", tasks: [] },
];

export default function App() {
  const [boards, setBoards] = useState<Board[]>(DEFAULT_BOARDS);

  function handleOnDrag(e: DragEvent, boardId: Uuid, taskId: Uuid) {
    e.dataTransfer.setData("board-id", boardId);
    e.dataTransfer.setData("task-id", taskId);
  }

  function handleOnDrop(e: DragEvent, id: Uuid) {
    const boardId = e.dataTransfer.getData("board-id");
    const taskId = e.dataTransfer.getData("task-id");

    const draft = [...boards];

    const prevBoardIndex = draft.findIndex((board) => board.id === boardId);
    if (prevBoardIndex === -1) setBoards(draft);
    const prevBoard = draft[prevBoardIndex];

    const boardIndex = draft.findIndex((board) => board.id === id);
    if (boardIndex === -1) setBoards(draft);
    const board = draft[boardIndex];

    const taskIndex = prevBoard.tasks.findIndex((task) => task.id === taskId);
    const task = prevBoard.tasks[taskIndex];

    prevBoard.tasks.splice(taskIndex, 1);
    board.tasks.push(task);

    setBoards(draft);
  }

  function handleOnDragOver(e: DragEvent) {
    e.preventDefault();
  }

  return (
    <main className="flex gap-4 p-4">
      {boards.map((board) => (
        <section
          key={board.id}
          onDrop={(e) => handleOnDrop(e, board.id)}
          onDragOver={handleOnDragOver}
          className="flex min-w-[275px] flex-col gap-4 border border-gray-400 bg-gray-100 p-4"
        >
          <h2 className="text-2xl font-bold leading-[1] underline decoration-orange-500 decoration-[3px] underline-offset-2">
            {board.title}
          </h2>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500 [&>span]:font-bold">
              Current Tasks: <span>{board.tasks.length}</span>
            </p>
            <ol className="flex flex-col gap-2">
              {board.tasks.map((task, index) => (
                <li
                  key={task.id}
                  draggable={true}
                  onDragStart={(e) => handleOnDrag(e, board.id, task.id)}
                  className="flex gap-2 border border-gray-300 bg-gray-200 p-2 text-sm text-gray-500"
                >
                  <span className="font-bold">{index + 1}.</span>
                  <span>{task.name}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}
    </main>
  );
}
