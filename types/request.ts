
export interface TypedRequestBody<BODY = {}, QUERY = {}> extends Express.Request {
  header(arg0: string): string
  user?: {
    firstName: string
    lastName: string
    email: string
    password: string
  }
  body: BODY
  query: QUERY
}
