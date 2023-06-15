import { useLocation } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import NoLayout from "./NoLayout";
import DashboardLayout from "./DashboardLayout";

const noLayoutPaths = ["/dang-nhap", "/dang-ky"];
const dashboardLayoutPaths = ["/dashboard"];

function MainLayout({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation();

  let Layout: ({ children }: { children: JSX.Element }) => JSX.Element =
    HomeLayout;

  if (noLayoutPaths.some((path) => pathname.includes(path))) {
    Layout = NoLayout;
  } else if (dashboardLayoutPaths.some((path) => pathname.includes(path))) {
    Layout = DashboardLayout;
  }
  return <Layout>{children}</Layout>;
}

export default MainLayout;
