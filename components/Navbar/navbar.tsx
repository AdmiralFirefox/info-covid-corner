import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGlobeAmericas } from "react-icons/fa";
import { RiVirusFill } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { IconContext } from "react-icons";
import navbarStyles from "../../styles/Home.module.scss";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <nav className={navbarStyles["navbar-wrapper"]}>
      <Link href="/">
        <a>
          <IconContext.Provider
            value={{
              className:
                router.pathname == "/"
                  ? navbarStyles["navbar-icon-active"]
                  : navbarStyles["navbar-icon"],
            }}
          >
            <FaGlobeAmericas />
          </IconContext.Provider>
        </a>
      </Link>
      <Link href="/covidinfo">
        <a>
          <IconContext.Provider
            value={{
              className:
                router.pathname == "/covidinfo"
                  ? navbarStyles["navbar-icon-active"]
                  : navbarStyles["navbar-icon"],
            }}
          >
            <RiVirusFill />
          </IconContext.Provider>
        </a>
      </Link>
      <Link href="/vaccineinfo">
        <a>
          <IconContext.Provider
            value={{
              className:
                router.pathname == "/vaccineinfo"
                  ? navbarStyles["navbar-icon-active"]
                  : navbarStyles["navbar-icon"],
            }}
          >
            <MdHealthAndSafety />
          </IconContext.Provider>
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
