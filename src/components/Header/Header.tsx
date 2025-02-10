function Header() {
  return (
    <nav className="green darken-1">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          React Shop
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a
              href="https://github.com/vitaliygalata1986/react-shop-redux"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
