import Footer from "./Footer";
import Header from "./Header";

function MainLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return (
    <div>
      <Header />
      <div id="body" className="pt-20 w-full px-28 pb-12">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
