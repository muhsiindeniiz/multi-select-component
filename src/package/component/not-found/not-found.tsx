import getErrorMessage from "../../../package/utils/get-error-message";
import ErrorElement from "../error-element";
import RoutingError from "../../../package/utils/routing-error";

const NotFound = () => {
  const errorData = getErrorMessage(new RoutingError(404));

  return <ErrorElement {...errorData} />;
};

export default NotFound;
