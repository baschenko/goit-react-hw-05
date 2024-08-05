import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import s from "./Navigation.module.css";
import { Suspense } from "react";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
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
      </header>
      <main>
        <Suspense
          fallback={
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          }>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Navigation;
