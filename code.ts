let message = "Teleportation Failed 👾";
let shouldClone = false;

//
// COMMANDS
//
if (figma.command === "cloneAndTeleport") {
  // copy selection to new page
  shouldClone = true;
  teleport(shouldClone);
} else if (figma.command === "teleport") {
  // move selection to new page
  teleport(shouldClone);
} else {
  figma.closePlugin(message);
}

//
// FUNCTIONS
//
function teleport(shouldClone: boolean) {
  if (figma.currentPage.selection.length <= 0) {
    message = "Please make a selection to teleport 🚀";
  } else {
    const newPage = figma.createPage();
    for (const node of figma.currentPage.selection) {
      if (shouldClone) {
        newPage.name = "Cloned Here";
        const duplicate = node.clone();
        newPage.appendChild(duplicate);
        message = "Teleported Clone 🚀";
      } else {
        newPage.name = "Teleported Here";
        newPage.appendChild(node);
        message = "Teleported 🚀";
      }
    }
  }
}

figma.closePlugin(message);
