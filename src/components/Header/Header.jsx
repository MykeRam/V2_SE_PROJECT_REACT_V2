import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData, onAddClick, user }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <h1 className="visually-hidden">What to Wear</h1>
      <div className="header__left">
        <Link className="header__logo-link" to="/">
          <div className="header__logo">wtwr&deg;</div>
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.location}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button
          className="header__add-button"
          type="button"
          onClick={onAddClick}
        >
          + Add clothes
        </button>

        <Link className="header__profile-link" to="/profile">
          <p className="header__username">{user.name}</p>
          <img className="header__avatar" src={user.avatar} alt={user.name} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
