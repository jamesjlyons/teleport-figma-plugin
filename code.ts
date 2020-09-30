const newPage = figma.createPage();
const notificationTime = 2000;
let message = "🚀";
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
  figma.closePlugin("Please choose a valid command");
}

//
// FUNCTIONS
//
function teleport(shouldClone: boolean) {
  if (figma.currentPage.selection.length <= 0) {
    figma.closePlugin("Please make a selection to teleport 🚀");
  } else {
    for (const node of figma.currentPage.selection) {
      if (shouldClone == true) {
        newPage.name = "Cloned Here";
        const duplicate = node.clone();
        newPage.appendChild(duplicate);
        message = "Teleported Clone 🚀";
        notify(message);
      } else if (shouldClone == false) {
        newPage.name = "Teleported Here";
        newPage.appendChild(node);
        message = "Teleported 🚀";
        notify(message);
      }
    }
  }
}

function notify(message: string) {
  figma.notify(message, {
    timeout: notificationTime,
  });
}

figma.closePlugin();
