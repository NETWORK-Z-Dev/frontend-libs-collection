# Json Editor

This library is used to easily convert a json key into an HTML element based on the key type. The overall goal is to easily create settings pages and have a quick and easy way to edit the value of the json key all automatically.

Example usage:

```js
domContainerElement.insertAdjacentElement("beforeend",
        JsonEditor.getSettingElement(
            config.serverinfo.name, // » "Your example title!"
            "Server Name", // » Option name
            "", // » Option description
            v => { // » onchange callback. v = new value.
                response.serverinfo.name = v;
                if (checkJsonChanges(response, originalnfo)) {
                    showSaveSettings(async () => {
                        saveServerInfoSettings(response);
                    })
                }
            }
        )
    );

// some example helpers
async function showSaveSettings(callback, text = "Unsaved Settings!") {
    if(!callback) throw new Error("No callback provided");

    let settingsContainer = document.querySelector(".settings-save-container");
    if(!settingsContainer){
        settingsContainer = document.createElement("div");
        settingsContainer.classList.add("settings-save-container");
        document.body.appendChild(settingsContainer);
    }

    settingsContainer.innerHTML = `
        <div class="settings-save-container-inner">
            <div class="settings-save-container-inner-text">
                ${text} 
            </div>
        </div>
    `;

    settingsContainer.classList.add("shown");
    settingsContainer.onclick = async () => {
        try{
            await callback();
        }
        catch(e){
            console.error(e);
        }
        closeSettingsPrompt()
    };
}

function checkJsonChanges(jsonObject, stringifiedOriginal){
    if(!jsonObject) throw new Error("No JSON Object supplied in checkChanges");

    if(JSON.stringify(jsonObject) !== stringifiedOriginal){
        return true;
    }
    else{
        closeSettingsPrompt();
        return false;
    }
}


function closeSettingsPrompt(){
    let settingsContainer = document.querySelector(".settings-save-container");
    if(!settingsContainer) return;

    settingsContainer.classList.remove("shown");
    setTimeout(() => {
        settingsContainer.remove();
    }, 200);
}
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

