export default function TopNav() {
  return (
    <div class="flex flex-row justify-center items-center py-4 border-b-1 border-solid border-black mb-4">
      <a href="/" class="flex-1"><h1 class="text-3xl font-bold">Orga</h1></a>
      <a href="/notes" class="flex-1 text-lg">Notes</a>
      <a href="/todos" class="flex-1 text-lg">Todos</a>
      <a href="/calender" class="flex-1 text-lg">Calender</a>
      <a href="/timer" class="flex-1 text-lg">Timer</a>
    </div>
  );
}
