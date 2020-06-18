FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.setOptions({
    stylePanelAspectRatio: 10 / 15,
    imageResizeTargetWidth: 10,
    imageResizeTargetHeight: 15,
});

FilePond.parse(document.body);