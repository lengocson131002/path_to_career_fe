import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppState } from "@/stores";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeLayout({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { account } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (account?.role === "Admin" || account?.role === "Freelancer") {
      navigate("/dashboard");
    }
  }, [account]);

  return (
    <div>
      <Header />
      <div
        id="body"
        className="md:pt-32 pt-20 w-full md:px-28 md:pb-12 pb-6 px-5"
        style={{
          minHeight: "calc(100vh - 300px)",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
