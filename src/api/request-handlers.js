class Request {
  constructor (options) {
    options = options || {}

    this.onSuccess = options.onSuccess || this.#defaultOnSuccess || (() => { })
    this.onError = options.onError || this.#defaultOnError || (() => { })
    this.onClientError = options.onClientError || this.onError || (() => { })
    this.onServerError = options.onServerError || this.onError || (() => { })
    this.onNoResponseError = options.onNoResponseError || this.onError || (() => { })
    this.onBadRequestError = options.onBadRequestError || this.onError || (() => { })
    this.onFinally = options.onFinally || (() => { })
  }

  #defaultOnSuccess (requestResponse) {
    return requestResponse
  }

  #defaultOnError = (err) => {
    throw err
  }

  #isclientError = (status) => {
    return status >= 400 && status <= 499
  }

  #isServerError = (status) => {
    return status >= 500 && status <= 599
  }

  handleRequest = async (promise) => {
    try {
      const response = await promise

      return this.onSuccess(response)
    } catch (err) {
      this.#handleError(err)
    } finally {
      this.onFinally(this)
    }
  }

  #handleError = (err) => {
    const { response, request } = err

    if (response) {
      const { status } = response

      // Se realizó la petición pero el servidor respondío con un código por encima de los 2xx

      if (this.#isclientError(status)) {
        // Es un error de cliente 400-499. Petición con sintaxis incorrecta (400),
        // el usuario no está autentificado (401), no tiene permiso (403), etc.

        this.onClientError(err)
      } else if (this.#isServerError(status)) {
        // Es un error del servidor 500-599. Error interno (500), la API llamada no existe (501),
        // el servidor está sobrecargado o en mantenimiento (503), etc.

        this.onServerError(err)
      }
    } else if (request) {
      // Se realizó la petición pero el servidor no respondió

      this.onNoResponseError(err)
    } else {
      // Ha sucedido algo durante la creación de la petición que ha provocado un error

      this.onBadRequestError(err)
    }
  }
}

function handleRequest (promise, options) {
  const request = new Request(options)

  return request.handleRequest(promise)
}

function handleMultipleRequests (promiseArray, options) {
  const request = new Request(options)

  return request.handleRequest(Promise.all(promiseArray))
}

export {
  handleRequest,
  handleMultipleRequests
}
