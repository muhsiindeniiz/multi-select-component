import isRoutingError from "../is-routing-error"

const getErrorMessage = (error: unknown) => {
    if (!isRoutingError(error)) {
        if (error instanceof Error) {
            return {
                title: "Unexpected error",
                description: error.message,
            }
        }

        return {
            title: "Unknown error",
            description: "An unknown error occurred.",
        }
    }

    switch (error.status) {
        case 404:
            return {
                title: "Unknown route",
                description: "The resource you are looking for does not exist or has been moved.",
                showNavigateBack: true,
            }
        case 400:
            return {
                title: "Bad request",
                description: error.data || "The request was malformed.",
            }
        case 401:
            return {
                title: "Unauthorized",
                description: "You are not authorized to view this page.",
            }
        case 503:
            return {
                title: "Service unavailable",
                description: "The service is currently unavailable.",
            }
        default:
            return {
                title: "Unknown error",
                description: error.data || "An unknown error occurred.",
            }
    }
}

export default getErrorMessage
