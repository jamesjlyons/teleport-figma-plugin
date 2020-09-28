// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
const nodes = [];
//
// COMMANDS //////////
//
if (figma.command === "copy") {
    // copy selection to new page
    copy();
}
else if (figma.command === "send") {
    // move selection to new page
    send();
}
//
// CORE FUNCTIONS //////////
//
function copy() {
    let newPage = figma.createPage();
    newPage.name = "Copied Here";
    for (const node of figma.currentPage.selection) {
        let duplicate = node.clone();
        newPage.appendChild(duplicate);
    }
}
function send() {
    let newPage = figma.createPage();
    newPage.name = "Sent Here";
    for (const node of figma.currentPage.selection) {
        newPage.appendChild(node);
    }
}
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
