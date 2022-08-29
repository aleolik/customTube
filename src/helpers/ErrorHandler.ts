
// if error then type in on console handler

export const ErrorHandler = (e : any) => {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
    console.error(message)
}

export const ErrorHandlerReturn = (e : any) => {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
    if (!message && e instanceof Error){
        message = `Error : ${e.name}`
    }
    return message
}