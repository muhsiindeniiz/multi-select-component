import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./package/component/error-boundary";
import NotFound from "./package/component/not-found";

const LandingPage = React.lazy(() => import("./module/landing-page/view"));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
          errorElement={<ErrorBoundary />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
