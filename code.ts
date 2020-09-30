const notificationTime = 2000;

//
// COMMANDS
//
if (figma.command === "copy") {
  // copy selection to new page
  copy();
} else if (figma.command === "send") {
  // move selection to new page
  send();
}

//
// FUNCTIONS
//
function copy() {
  if (figma.currentPage.selection.length <= 0) {
    figma.closePlugin("Please make a selection to teleport 🚀");
  } else {
    const newPage = figma.createPage();
    newPage.name = "Copied Here";
    for (const node of figma.currentPage.selection) {
      const duplicate = node.clone();
      newPage.appendChild(duplicate);
    }
    figma.notify("Teleported Copy 🚀", {
      timeout: notificationTime,
    });
  }
}

function send() {
  if (figma.currentPage.selection.length <= 0) {
    figma.closePlugin("Please make a selection to teleport 🚀");
  } else {
    const newPage = figma.createPage();
    newPage.name = "Teleported Here";
    for (const node of figma.currentPage.selection) {
      newPage.appendChild(node);
    }
    figma.notify("Teleported 🚀", {
      timeout: notificationTime,
    });
  }
}

figma.closePlugin();
