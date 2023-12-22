import React, { FC } from "react";
import { ErrorBoundaryProps } from "./error-boundary.type";

import { useRouteError } from "react-router-dom";

import getErrorMessage from "../../../package/utils/get-error-message";
import ErrorElement from "../error-element";


const ErrorBoundary: FC<ErrorBoundaryProps> = () => {
  const error = useRouteError();

  const errorData = getErrorMessage(error);

  return <ErrorElement {...errorData} />;
};

export default ErrorBoundary;
