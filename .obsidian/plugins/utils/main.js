const { Plugin } = require("obsidian");

module.exports = class extends Plugin {
  onload() {
    this.addCommand({
      id: "capture",
      name: "Capture",
      callback: () => this.app.workspace.openLinkText("Entrada", ""),
    });
  }
};
