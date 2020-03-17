import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to={"/"}><span className="navbar-brand">Google Book Search</span></Link>
      <Link to={"/books"}><span className="navbar-brand">Saved Books</span></Link>
    </nav>
  );
}

export default Nav;