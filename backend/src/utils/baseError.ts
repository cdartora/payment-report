type BaseError = {
  message: string;
  status: number;
}

const BaseError = (status: number, message: string): BaseError => ({ message, status })

export default BaseError