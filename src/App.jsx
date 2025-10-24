import { useState } from "react";
import "./App.css";
import Book from "./components/book.jsx";
import AddCard from "./components/AddCard";

export default function App() {
  const [items, setItems] = useState([]); // start empty
  const [showModal, setShowModal] = useState(false);

  const selected = items.find((b) => b.selected) ?? null;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleToggleSelect = (id) => {
    setItems((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, selected: !b.selected }
          : { ...b, selected: false }
      )
    );
  };

  const handleDeleteSelected = () => {
    if (!selected) return;
    setItems((prev) => prev.filter((b) => b.id !== selected.id));
  };

  const handleUpdateSelected = () => {
    // no-op for now
  };

  const handleCreateBook = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") || "").trim();
    const author = String(form.get("author") || "").trim();
    const coverUrl = String(form.get("coverUrl") || "").trim();
    if (!title) return;

    const newBook = {
      id: `local-${Date.now()}`,
      title,
      author,
      image: coverUrl,
      url: coverUrl,
      selected: false,
    };
    setItems((prev) => [newBook, ...prev]);
    setShowModal(false);
    e.currentTarget.reset();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Mai&apos;s Book Catalog</h1>
      </header>

      <main className="content">
        <div className="grid-wrapper">
          <aside className="add-col">
            <AddCard onClick={openModal} />

            <div className="actions">
              <button
                className="action-btn"
                type="button"
                onClick={handleUpdateSelected}
                disabled={!selected}
              >
                Edit
              </button>
              <button
                className="action-btn danger"
                type="button"
                onClick={handleDeleteSelected}
                disabled={!selected}
              >
                Delete
              </button>
            </div>
          </aside>

          <section className="grid-books">
            {items.map((b) => (
              <Book
                key={b.id}
                book={b}
                selected={!!b.selected}
                onToggle={() => handleToggleSelect(b.id)}
              />
            ))}
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Mai Crespo</p>
      </footer>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-book-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="new-book-title">Create a New Book</h2>
              <button
                className="icon-btn close"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form className="book-form wide" onSubmit={handleCreateBook}>
              {/* left column = labels, right column = fields */}
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="book title..."
                required
              />

              <label htmlFor="author">Author</label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Author"
                required
              />

              <label htmlFor="publisher">Publisher</label>
              <input
                id="publisher"
                name="publisher"
                type="text"
                placeholder="Publisher"
              />

              <label htmlFor="year">Publication Year</label>
              <input
                id="year"
                name="year"
                type="number"
                min="0"
                placeholder="e.g. 2019"
              />

              <label htmlFor="language">Language</label>
              <input
                id="language"
                name="language"
                type="text"
                placeholder="Language"
              />

              <label htmlFor="pages">Pages</label>
              <input
                id="pages"
                name="pages"
                type="number"
                min="1"
                placeholder="e.g. 320"
              />

              <label htmlFor="coverUrl">URL (book cover)</label>
              <input
                id="coverUrl"
                name="coverUrl"
                type="url"
                placeholder="https://…"
                required
              />

              {/* actions row spans both columns */}
              <div className="modal-actions two-col">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
