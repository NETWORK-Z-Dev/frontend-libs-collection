# Rich Editor

This is an amazing class using a customized version of quill to bring rich editors to your web app.

---

## Examples

```js
const editor = new RichEditor({
    selector: ".page-renderer .inbox-editor", // where the editor will insert itself to
    toolbar: [ // quill toolbar options
        ["bold", "italic", "underline"],
        ["code-block", "link"]
    ],
    onImg: async (src) => { // what to do when images are detected
        // in this case, base64 images are converted to files and uploaded,
        // and once uploaded replaced with the actual file url.
        console.log("Uploading and replacing src " + src)
        let upload = await ChatManager.srcToFile(src);
        editor.insertImage(upload.path)
    },
    onSend: async (html) => {
		// what to do when ENTER is pressed.
        console.log(html, messageId);
        if (!messageId) throw new Error("Couldnt find inbox reply message id")

        replyMessageId = messageId;
        let wasSent = await sendMessageToServer(null, null, null, html, true);
        if (wasSent) {
            Inbox.markAsRead(inboxId)
			// this is very important as it wont clear itself otherwise!
            editor.clear()
        }
    }
});
```

