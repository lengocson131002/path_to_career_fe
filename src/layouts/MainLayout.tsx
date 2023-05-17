import Header from "./Header";

function MainLayout({ children }: { children: JSX.Element | string }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default MainLayout;
