# ContextMenu

The ContextMenu library is used to show highly dynamic context menus and entries based on callbacks and features requirement callbacks and more. It works for right clicks, double clicks, click and hover tooltips.

```js
document.addEventListener("DOMContentLoaded", async () => {
    ContextMenu.init();
    
    ContextMenu.registerContextMenu(
    	"some_unique_name",
        [
            "#css_selector_here",
        ],
        [
            {
                icon: "&#10022;",
                text: "Say Hello",
                callback: async (data) => {
                    console.log(data);
                    alert("Hello!")
                },
                // condition is optional and can be removed
                condition: async (data) => {
                    return true;
                },
                type: "success"
            }
        ]
    )
})
```

