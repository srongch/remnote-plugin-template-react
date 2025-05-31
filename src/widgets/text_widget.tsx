import {
    declareIndexPlugin,
    ReactRNPlugin,
    renderWidget,
    usePlugin,
    useTracker,
    SelectionType,
    RICH_TEXT_ELEMENT_TYPE,
    WidgetLocation
} from "@remnote/plugin-sdk";

function AudioTaggerWidget() {
    const plugin = usePlugin();

    const selectedText = useTracker(async (reactivePlugin) => {
        const selection = await reactivePlugin.editor.getSelection();
        if (selection?.type === SelectionType.Text) {
            return await reactivePlugin.richText.toString(selection.richText);
        }
        return 'No text selected.';
    });

    const appendAudioTag = async () => {
        const selection = await plugin.editor.getSelection();

        if (selection?.type === SelectionType.Text) {
            const audioUrl = prompt('Enter the audio URL:');
            if (audioUrl && audioUrl.trim() !== '') {
                const audioElement = {
                    i: RICH_TEXT_ELEMENT_TYPE.AUDIO,
                    url: audioUrl.trim(),
                    onlyAudio: true
                };

                const rem = await plugin.rem.findOne(selection.remId);
                if (rem) {
                    const updatedRichText = [...rem.text, audioElement];
                    console.log('updatedRichText', updatedRichText);
                    await rem.setText(updatedRichText);
                }
            }
        } else {
            alert('Please select some text first.');
        }
    };

    return (
        <div>
            <p><strong>Selected Text:</strong> {selectedText}</p>
            <button onClick={appendAudioTag}>🔊 Add Audio</button>
        </div>
    );
}

renderWidget(AudioTaggerWidget);
