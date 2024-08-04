import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";
import s from "./Navigation.module.css";
import { Suspense } from "react";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = ({ onChange, options }) => {
  return (
    <div>
      <header className={s.header}>
        <nav>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
        <label className={s.label}>
          images
          <input
            type="checkbox"
            className={[s.checkbox, options ? s.on : s.off].join(" ")}
            value="false"
            onChange={() => onChange()}
          />
        </label>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Navigation;
