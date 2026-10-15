export default function SearchBar() {
  return (
    <div>
      <form action="/search">
        <input type="text" name="q" placeholder="Search movies..." />
        <button type="submit">⌕ Search</button>
      </form>
    </div>
  );
}
