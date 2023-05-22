import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

function HomeLayout({ children }: { children: JSX.Element }) {
  return (
    <div>
      <Header />
      <div id="body" className="pt-32 w-full px-28 pb-12">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
