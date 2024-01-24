# Azure Function with `dd-trace` test

This project was initialized with:

```sh
func init MyProjFolder --worker-runtime typescript --model V4
func new --template "Http Trigger" --name MyHttpTrigger
```

Running on Macos 14.3 with latest node@18 (v18.19.0) and latest azure-function-core-tools@v4 (version 4.0.5455) starting the func with `npm start` does not work when `dd-trace` is imported and enabled.
