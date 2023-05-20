import Footer from "./Footer";
import Header from "./Header";

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
