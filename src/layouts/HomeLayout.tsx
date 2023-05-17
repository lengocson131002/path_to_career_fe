import Header from "./Header";

function HomeLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default HomeLayout;
