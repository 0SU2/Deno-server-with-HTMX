export interface User {
  id: number,
  username: string,
  name: string,
  last_name: string,
}

export interface Database {
  [key: number]: User,
  length: number 
}