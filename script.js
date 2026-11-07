const editor = document.getElementById("codeEditor");
const preview = document.getElementById("previewFrame");
const clearButton = document.getElementById("clearButton");
const characterCount = document.getElementById("characterCount");

editor.addEventListener("input", () => {
    preview.srcdoc = editor.value;
    characterCount.textContent = `${editor.value.length} characters`;
});

clearButton.addEventListener("click", () => {
    editor.value = "";
    preview.srcdoc = "";
    characterCount.textContent = "0 characters";
});