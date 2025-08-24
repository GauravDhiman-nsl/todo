import { Suspense } from "react";
import TodoHome from "./(todo)/todo-home";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
     <div>
       <Suspense fallback={<p>Loading Todos...</p>}>
          <TodoHome />
        </Suspense>
     </div>
      </main>
    </div>
  );
}
