# Page renderer

This is a small helpful toolbox to render HTML in dynamic "panel". For example you can overlay another element and it will adapt to its size, even if it changes etc which is helpful for Single Page Web Applications etc. It even fades in and out! 

---

## Example

```js
await PageRenderer.renderHTML(domElement.closest(".inbox-container"),
    `
        <div class="inbox-reply">
            <span onclick="PageRenderer.remove();" style="cursor: pointer;">« Back</span>

            <div class="inbox-content">
                ${data.element.closest(".entry").outerHTML}
            </div>

            <span>Reply</span>
            <div class="inbox-editor"></div>
        </div>

        `
)

// if not needed anymore
PageRenderer.remove()
```

