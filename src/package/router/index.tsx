import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import Loading from "../../package/component/loading";
import ErrorBoundary from "../component/error-boundary";

const App = lazy(() => import("../../App"));

export const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <>
        <Suspense fallback={<Loading height="100vh" message="Loading app" />}>
          <App />
        </Suspense>
      </>
    ),
    errorElement: <ErrorBoundary />,
  },
]);
