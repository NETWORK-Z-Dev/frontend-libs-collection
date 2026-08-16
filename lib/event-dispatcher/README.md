# EventDistpatcher

Simple tool to dispatch events and listen to them with callback api.

```js
EventDispatcher.on("event", data => {
	// code
})

EventDispatcher.send("event", {
    id: 1
})
```

