import { Database } from "../utils/structures.ts";
import { CreateDatabase } from "../utils/functions.ts";
import { Application, Router } from "@oak/oak";
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts';
import * as sqlite from "@db/sqlite";

const app = new Application();
const route = new Router();
const handle = new Handlebars()
const db = new sqlite.Database("./database/database.db");

route.get("/", async(context) => {
  context.response.body = await handle.renderView("layouts/main")
})

route.get("/search", async(context) => {
  const user = context.request.url.search.split("=")[1]
  const respose = db.prepare("SELECT * FROM users WHERE username = :user").get({user});
  if(respose) {
    context.response.body = respose
  } else {
    const td = new TextDecoder();
    const p = await new Deno.Command("go", { args: ["run", "./exec/main.go"] }).output();
    const out = td.decode(p.stdout).trim();
    const err = td.decode(p.stderr).trim();
    if (err) context.response.body = "Error in server"
    else context.response.body = out
  }
})

route.get("/posts", (context) => {
  const data = db.prepare("SELECT * FROM users").values()
  const dbatabase:Database = [];

  for(let number = 0; number < data.length; number++ ) {
    dbatabase[number] = CreateDatabase(data[number].at(0), data[number].at(1), data[number].at(2), data[number].at(3))
    dbatabase.length = number + 1;
  }
  context.response.body = dbatabase
})

app.use(route.routes());
app.use(route.allowedMethods());

app.listen({port: 6969})