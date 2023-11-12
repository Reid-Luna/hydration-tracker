import { TextFileView } from "obsidian";
import React from "react";
import { createRoot } from "react-dom/client";

import { ViewComponent } from "../ui/ViewComponent.jsx";

import Settings from "./settings";

export default class View extends TextFileView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;

    this.addAction("pencil", "Edit Log", async (e) => {
      const state = leaf.view.getState();
      leaf.setViewState(
        {
          type: "markdown",
          state,
          popstate: true,
        },
        { focus: true }
      );
    });
  }

  getViewType() {
    return Settings.ViewType;
  }

  getDisplayText() {
    return this.plugin.settings.Title;
  }

  getViewData() {
    return this.data;
  }

  async onLoadFile(file) {
    this.file = file;
    this.data = await this.app.vault.cachedRead(file);
    this.root.render(<ViewComponent log={this.data} view={this} />);
  }

  onOpen() {
    this.root = createRoot(this.containerEl.children[1]);
  }

  onClose() {
    this.root?.unmount();
  }
}
