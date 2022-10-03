export default function DeleteButton(
  { redirectOnSuccessUrl }: { redirectOnSuccessUrl: string },
) {
  const onDelete = async () => {
    if (!confirm("Are you sure?")) {
      return;
    }
    const result = await fetch(location.href, {
      method: "DELETE",
    });
    if(result.ok) {
      location.href = redirectOnSuccessUrl;
    }
  };

  return (
    <button
      class="px-2 py-1 border(black 1) hover:bg-gray-200"
      onClick={onDelete}
      type="button"
    >
      Delete
    </button>
  );
}
