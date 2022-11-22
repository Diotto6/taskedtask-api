import Application from "./app";

const application = new Application();

const port = process.env.PORT ? Number(process.env.PORT) : 9009;

application.init();
application.start(port);
