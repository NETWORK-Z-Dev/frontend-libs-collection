# Custom Prompts

This library was made to offer an advanced alternative to the native alert, prompt and confirm functions by creating a new class with custom elements etc.

---

## Examples

```js
let customPrompts = new Prompt();

customPrompts.showPrompt(
            "Ban User",
            `
            <div class="prompt-form-group">
                <label class="prompt-label" for="banReason">Reason (optional)</label>
                <input class="prompt-input" id="tt_banUserDialog_banReason" type="text" name="banReason">
            </div>
    
            <div class="prompt-form-group">
                <label class="prompt-label" for="banDurationType">Ban Duration Type</label>            
                <input class="prompt-input" type="number" id="tt_banUserDialog_banDurationNumber" min="0" step="1" name="banDurationNumber" placeholder="Number in days, e.g. 7">
                
                <select class="prompt-input prompt-select" id="tt_banUserDialog_banDurationType" name="banDurationType">
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option default selected value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="perma">Permanent</option>
                </select>
            </div>
    
            `,
            (values) => { // on submit callback
                console.log('Submitted Values:', values);
                // values are based on the 'name' property of elements

                let banReason = values.banReason;
                let banDuration = `${Math.floor(values.banDurationNumber)} ${values.banDurationType}`

                socket.emit("banUser", {
                    id: UserManager.getID(),
                    token: UserManager.getToken(),
                    target: id,
                    reason: banReason,
                    duration: banDuration
                }, function (response) {
                    showSystemMessage({
                        title: response.msg,
                        text: "",
                        icon: response.type,
                        img: null,
                        type: response.type,
                        duration: 1000
                    });
                });
            },
            ["Ban", "error"],
            false,
            250,
            () => {
                tooltipSystem.clearTooltipLocalStorage("tt_banUserDialog_");
                banUserTooltip();
            },
            afterSubmitAction
        );


// Confirm dialog
customPrompts.showConfirm("Remove this member from the chat?",
        [ // options
    		["Yes", "success"], // [text, color]
         	["No", "error"] // [text, color]
		],
        async (selected) => {
            if (selected !== "yes") return;
            let res = await removeDmRoomParticipant(roomId, memberId);
            if (res?.error) console.error("remove participant failed:", res.error);
        }
    )
```

