import React from "react";

import routes from "config/routes";
import bagIcon from "assets/pics/bag-2.png";
import miniLogo from "assets/pics/Mini_logo.png";
import userIcon from "assets/pics/user.png";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";

import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.header}>
      <Link to={routes.products} className={s.header__logo_wrapper}>
        <img src={miniLogo} alt="logo" className={s.header__logo} />
        <span className={s.header__company_name}>Lalasia</span>
      </Link>
      <div className={s.header__menu_wrapper}>
        <NavLink
          to={routes.products}
          className={({ isActive }: { isActive: Boolean }) =>
            classNames(isActive && s.selected)
          }
        >
          Product
        </NavLink>
        <NavLink
          to={routes.services}
          className={({ isActive }: { isActive: Boolean }) =>
            classNames(isActive && s.selected)
          }
        >
          Services
        </NavLink>
        <NavLink
          to={routes.articles}
          className={({ isActive }: { isActive: Boolean }) =>
            classNames(isActive && s.selected)
          }
        >
          Article
        </NavLink>
        <NavLink
          to={routes.about}
          className={({ isActive }: { isActive: Boolean }) =>
            classNames(isActive && s.selected)
          }
        >
          AboutUs
        </NavLink>
      </div>
      <div className={s.header__user_wrapper}>
        <Link to={routes.bag}>
          <img src={bagIcon} alt="bag" />
        </Link>

        <Link to={routes.cabinet}>
          <img src={userIcon} alt="cabinet" />
        </Link>
      </div>
    </div>
  );
};
export default React.memo(Header);
