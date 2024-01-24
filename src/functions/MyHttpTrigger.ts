import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

/*

  The import and init in the following two line causes `npm start` to fail locally with:

  WARNING: Failed to detect the Azure Functions runtime. Switching "@azure/functions" package to test mode - not all features are supported.
  WARNING: Skipping call to register function "MyHttpTrigger" because the "@azure/functions" package is in test mode.
  No job functions found. Try making your job classes and methods public. If you're using binding extensions (e.g. Azure Storage, ServiceBus, Timers, etc.) make sure you've called the registration method for the extension(s) in your startup code (e.g. builder.AddAzureStorage(), builder.AddServiceBus(), builder.AddTimers(), etc.).

  If we disable the import, everything works find.
*/
import tracer from "dd-trace";
tracer.init({});

export async function MyHttpTrigger(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get("name") || (await request.text()) || "world";

  return { body: `Hello, ${name}!` };
}

app.http("MyHttpTrigger", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: MyHttpTrigger,
});
