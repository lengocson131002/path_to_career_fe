import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

function HomeLayout({ children }: { children: JSX.Element }) {
  return (
    <div>
      <Header />
      <div
        id="body"
        className="md:pt-32 pt-20 w-full md:px-28 md:pb-12 pb-6 px-5"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
