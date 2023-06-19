import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionFunction,
  BrowserRouter,
  LoaderFunction,
  Route,
  Routes,
} from "react-router-dom";
import Loader from "./components/core/Loader";
import ScrollToTop from "./components/core/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import { getMe } from "./services/accounts/services";
import { AppState } from "./stores";
import { setUserState } from "./stores/user.store";
import { setGlobalState } from "./stores/global.store";

interface IRoute {
  path: string;
  Element: React.ComponentType<any>;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: JSX.Element;
}

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    // @ts-ignore
    Element: pages[path].default,
    // @ts-ignore
    loader: pages[path]?.loader as unknown as LoaderFunction | undefined,
    // @ts-ignore
    action: pages[path]?.action as unknown as ActionFunction | undefined,
    // @ts-ignore
    ErrorBoundary: pages[path]?.ErrorBoundary as unknown as JSX.Element,
  });
}

// const router = createBrowserRouter(
//   routes.map(({ Element, ErrorBoundary, ...rest }) => ({
//     ...rest,
//     // @ts-ignore
//     element: <Element />,
//     // @ts-ignore
//     ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
//   }))
// );

const App = () => {
  const { loading } = useSelector((state: AppState) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("refresh_token")) {
      dispatch(
        setGlobalState({
          loading: true,
        })
      );
      getMe().then((res) => {
        dispatch(
          setUserState({
            account: res,
          })
        );
        dispatch(
          setGlobalState({
            loading: false,
          })
        );
      });
    }
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1864AB",
          // colorError: "#a10e22 ",
        },
      }}
    >
      <BrowserRouter>
        <Loader loading={loading} />
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <Routes>
              {routes.map(({ Element, ErrorBoundary, ...rest }, index) => {
                return (
                  <Route key={index} path={rest.path} element={<Element />} />
                );
              })}
            </Routes>
          </MainLayout>
        </QueryClientProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
