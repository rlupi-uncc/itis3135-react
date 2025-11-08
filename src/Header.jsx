import { Link } from "react-router";

function Header() {
  return (
    <header>
      <h1>ITIS3135 | Randall Lupi's Raging Lemur</h1>
      <nav className="primary-nav">
        <Link to="/">ITIS3135</Link> |
        <Link to="/contract">Contract</Link> |
        <Link to="/introduction">Introduction</Link>
      </nav>
    </header>
  );
}

export default Header;
