
export interface TypedRequestBody<T> extends Express.Request {
  user?: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
  body: T
}

export interface TypedRequestQuery<T> extends Express.Request {
  query: T
}

export interface RequestWithUser extends Express.Request {
  header(arg0: string): string
  user: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}