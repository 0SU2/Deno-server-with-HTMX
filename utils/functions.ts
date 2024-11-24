import { Database, User } from "./structures.ts"

export function CreateDatabase(id:number, username:string, name:string, last_name:string): User {
  return {
    id: id,
    username: username,
    name: name,
    last_name: last_name,
  }
}

// export async function GetAllUsers (db:Database): Promise<any> {
  // // obtain data from the database
  // const data = db.prepare("SELECT * FROM users").values()
  // const dbatabase:Database = [];

  // for(let number = 0; number < data.length; number++ ) {
  //   dbatabase[number] = CreateDatabase(data[number].at(0), data[number].at(1), data[number].at(2), data[number].at(3))
  //   dbatabase.length = number + 1;
  // }

  // console.log(dbatabase)
  // context.response.body = await handle.renderView("layouts/main", {data: dbatabase})
// }