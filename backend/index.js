import app from "./app.js";
import "./database.js";
import { config } from "./src/config.js";

async function main() {
    app.listen(4000);
    console.log("Server running");
  }

  main();