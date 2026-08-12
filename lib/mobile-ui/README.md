# Mobile UI

This cool library is used to easily make websites mobile compatible by enabling devs to easily make elements on the website, like a div for navigation, into a mobile-like site panel that can be accessed via swiping.

---

## Examples

```js
MobilePanel.setLeftMenu([
    {
        direction: "column",
        children: [
            document.querySelector("#mainLayout #header")
        ]
    },
    {
        direction: "row",
        flex: "1 1 0",
        flexGrow: 1,
        flexShrink: 1,
        height: "100%",
        children: [
            document.querySelector("#mainLayout #serverlist"),
            document.querySelector("#mainLayout #channellist")
        ]
    }
], "left");

MobilePanel.setRightMenu([
    {
        direction: "column",
        children: [
            document.querySelector("#mainLayout #infolist")
        ]
    }
], "right");

if (MobilePanel.isMobile()) {
    MobilePanel.renderPanel(channelRolesRightPanel, "right")
}
```

