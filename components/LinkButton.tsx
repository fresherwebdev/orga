import { JSX } from "preact";

export default function LinkButton(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      class="px-2 py-1 border(black 1) hover:bg-gray-200"
    >
      {props.children}
    </a>
  );
}
