export default function Book({ book, selected, onToggle }) {
  const { title, price, image, url, author } = book || {};

  return (
    <article
      className={`card book-card ${selected ? "selected" : ""}`}
      onClick={onToggle}
      tabIndex={0}
      aria-pressed={selected}
      title={selected ? "Selected" : "Click to select"}
    >
      <img src={image} alt={title} />
      <div className="card-body">
        <h3 className="book-title">{title}</h3>
        {author ? <p className="book-author">{author}</p> : null}
        <p className="book-price">{price ?? "—"}</p>
        <a
          className="details"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Details
        </a>
      </div>
    </article>
  );
}
