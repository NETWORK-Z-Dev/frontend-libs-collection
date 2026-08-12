# Json Editor

This library is used to easily convert a json key into an HTML element based on the key type. The overall goal is to easily create settings pages and have a quick and easy way to edit the value of the json key all automatically.

**Example usage:**

```js
getTabContentPage().insertAdjacentElement(
            "beforeend",
            JsonEditor.getSettingElement( // generates the setting HTML element
                nickname, // input value, like a string 
                "Display Name", // the display setting name
                "How others will see you", // the setting description, optional
                
                async (value) => { // onchange callback with new value passed
                    // example check if settings changed
                    if (originalUserData.nickname !== value) {
                        
                        // if it changed you can show a save button.
                        // this button needs an id to track changes.
                        JsonEditor.showSaveButton("nickname", () => {
                            // this callback fires when the save button is clicked.
                            originalUserData.nickname = value
                            saveAccountChanges({
                                name: value
                            });
                        });
                    } else {
                        JsonEditor.hideSaveButton();
                    }
                }, 
                // optional settings, like regex matching.
                {
                    regexMatcher: /^[a-zA-Z0-9_. -]{1,30}$/,
                    canBeNull: true,
                })
        )
```



---

## Example CSS customization

```js
.json-editor-setting {
    background-color: hsl(from var(--main) h s calc(l * 3));
    padding: 8px;
    border-radius: 6px;
    border: 0.5px solid hsl(from var(--main) h s calc(l * 10) / 20%);
}
.json-editor-setting hr{
    display: none;
}
.json-editor-setting .json-editor-setting-headline{
    color: hsl(from var(--main) h s calc(l * 10) / 100%);
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 4px;
}
.json-editor-setting .json-editor-setting-description{
    color: hsl(from var(--main) h s calc(l * 8) / 100%);
    font-size: 12px;
}

.json-editor-setting input,
.json-editor-setting button{
    outline: none;
    padding: 4px;
    border-radius: 4px;
    background-color: hsl(from var(--main) h s calc(l * 4) / 100%);
    color: hsl(from var(--main) h s calc(l * 10) / 100%);
    border: 2px solid hsl(from var(--main) h s calc(l * 10) / 20%);
    cursor: pointer;
}


/* settings popup helper */
.settings-save-container.shown {
    opacity: 1;
}
.settings-save-container {
    opacity: 0;
    position: absolute;
    z-index: 10;
    width: 80%;
    height: fit-content;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);

    background-color: hsl(from var(--main) h s calc(l * 6) / 40%);
    border: 0.5px solid hsl(from var(--main) h s calc(l * 10) / 20%);
    backdrop-filter: blur(10px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: auto;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    box-shadow: 0 0 20px 10px hsl(from var(--main) h s calc(l * 6) / 10%);
    font-weight: bold;
    color: hsl(from var(--main) h s calc(l * 10) / 100%);
}

.settings-save-container:hover {
    background-color: hsl(from var(--main) h s calc(l * 6) / 55%);
}
```

