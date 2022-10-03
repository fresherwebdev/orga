import TopNav from "../components/TopNav.tsx";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class="container p-4 mx-auto">
      <TopNav />
      <div class="flex flex-col items-center">
          <h1 class="text-4xl">Welcome to Orga</h1>
          <img
            src="/logo.svg"
            class="w-1/4"
          />
      </div>
    </div>
  );
}
