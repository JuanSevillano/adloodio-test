import { App } from "./app"

const port = process.env.NODE_PORT || 4848;

export function run() {
  const app = new App()
  app.listen(port as number)
}

if (process.env.NODE_ENV !== 'testing') {
  run();
}
