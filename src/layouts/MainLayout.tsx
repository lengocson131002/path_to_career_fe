import { useLocation } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import NoLayout from "./NoLayout";

const noLayoutPaths = ["/dang-nhap", "/dang-ky"];

function MainLayout({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation();

  let Layout: ({ children }: { children: JSX.Element }) => JSX.Element =
    HomeLayout;

  if (noLayoutPaths.some((path) => pathname.includes(path))) {
    Layout = NoLayout;
  }

  return <Layout>{children}</Layout>;
}

export default MainLayout;
