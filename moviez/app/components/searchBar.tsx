export default function SearchBar() {
  return (
    <form
      action="/search"
      className="glass-bar flex max-w-md items-center gap-2 rounded-full p-1.5 pl-5 focus-within:ring-2 focus-within:ring-aqua"
    >
      <input
        type="text"
        name="q"
        placeholder="Search movies..."
        aria-label="Search movies"
        className="min-w-0 flex-1 bg-transparent font-bold text-ink outline-none placeholder:text-ink-soft"
      />
      <button
        type="submit"
        className="glass-pill-active rounded-full px-5 py-2 font-bold"
      >
        ⌕ Search
      </button>
    </form>
  );
}
