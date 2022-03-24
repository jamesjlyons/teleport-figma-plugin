let message = "Teleportation Failed 👾";

figma.parameters.on("input", ({ query, key, result }: ParameterInputEvent) => {
  if (figma.currentPage.selection.length === 0) {
    result.setError("Please make a selection to teleport 🚀");
    return;
  }
  switch (key) {
    case "clone":
      const options = ["Teleport", "Duplicate and Teleport"];
      result.setSuggestions(options);
      break;
    default:
      return;
  }
});

// When the user presses Enter after inputting all parameters, the 'run' event is fired.
figma.on("run", ({ parameters }: RunEvent) => {
  if (parameters) {
    startPluginWithParameters(parameters);
  } else {
    figma.closePlugin(message);
  }
});

// Start the plugin with parameters
function startPluginWithParameters(parameters: ParameterValues) {
  const shouldClone = parameters["clone"];
  let name = parameters["pagename"];
  const newPage = figma.createPage();

  // if page parameter is empty, name page
  if (name === undefined) {
    name = "Teleported Here";
  }

  for (const node of figma.currentPage.selection) {
    if (shouldClone == "Duplicate and Teleport") {
      newPage.name = name;
      const duplicate = node.clone();
      newPage.appendChild(duplicate);
      message = "Teleported Clone 🚀";
    } else {
      newPage.name = name;
      newPage.appendChild(node);
      message = "Teleported 🚀";
    }
  }
  figma.currentPage.selection = [];
  figma.closePlugin(message);
}
