import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGlobeAmericas } from "react-icons/fa";
import { RiVirusFill } from "react-icons/ri";
import { MdHealthAndSafety } from "react-icons/md";
import { IconContext } from "react-icons";
import styles from "../../styles/navbar/NavbarMain.module.scss";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <nav className={styles["navbar-wrapper"]}>
      <Link href="/">
        <a>
          <IconContext.Provider
            value={{
              className:
                router.pathname == "/"
                  ? styles["navbar-icon-active"]
                  : styles["navbar-icon"],
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
                  ? styles["navbar-icon-active"]
                  : styles["navbar-icon"],
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
                  ? styles["navbar-icon-active"]
                  : styles["navbar-icon"],
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
