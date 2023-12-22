class RoutingError {
    status: number
    data?: string

    constructor(status: number, data?: string) {
        this.status = status
        this.data = data
    }
}

export default RoutingError
