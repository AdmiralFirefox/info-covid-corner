import { FC } from "react";
import Meta from "./Meta";
import Navbar from "./Navbar/NavbarMain";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
