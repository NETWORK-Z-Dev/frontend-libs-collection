# Autocomplete

This is a simple auto-complete library for the frontend that works on an identifer like @, # etc and shows a list of entries that are found. You can navigate using the arrow keys and select a value by pressing tab or enter.

---

## Gettign started

```js
let mentionAc = new Autocomplete(element, {
    maxHeight: 250,
    offsetY: -50,
    bg: "hsl(from var(--main) h s calc(l * 2) / 100%)",
    color: "hsl(from var(--main) h s calc(l * 10) / 100%)",
    borderColor: "hsl(from var(--main) h s calc(l * 10) / 20%)",
    highlightBg: "hsl(from var(--main) h s calc(l * 2.5))",
    highlightColor: "hsl(from var(--main) h s calc(l * 12) / 100%)"
});

// add listener
document.addEventListener("keydown", e => {
    if (!mentionAc) return;
    mentionAc.onKey(e);
});

// add entry that can be found with @name identifier for example.
// this entire object (the { type...} stuff) will be used in onSelect and
// passed as "item"
mentionAc.addEntry(name, {
    type: "member",
    member: { id: memberId, ...member },
    html
}, html, "@");

// what should happen on item select
mentionAc.onSelect = item => {
    let insert = "";
    if (item?.data?.type === "channel") {
        insert = `<#@${item.data.channel.id}>`;
    } else if (item?.data?.type === "member") {
        insert = `<@${item.data.member.id}>`;
    } else if (item?.data?.type === "role") {
        insert = `<!@${item.data.role.id}>`;
    }

    quill.insertText(start, insert);

    mentionAc.hide();
};

// quill is a rich editor, works with anything tho
quill.on("text-change", () => {
    const text = getTextBeforeCursor();
    const match = text.match(/([@#])([^\s@#]*)$/);

    // if text doesnt match regex there is no need to
    // show the autocomplete results.
    if (!match) {
        mentionAc.hide();
        return;
    }

    const identifier = match[1];
    const searchTerm = match[2];

    mentionAc.showFiltered(searchTerm, identifier);
});
```

