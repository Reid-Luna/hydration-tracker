import React from "react";
import { Modal } from "obsidian";
import { createRoot } from "react-dom/client";
import { ModalComponent } from "../ui/ModalComponent.jsx";

export default class ConsumptionModal extends Modal {
  constructor(app, onSubmit, settings) {
    super(app);
    this.onSubmit = onSubmit;
    this.settings = settings;
  }

  onOpen() {
    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <ModalComponent
        modal={this}
        submit={this.onSubmit}
        settings={this.settings}
      />
    );
  }

  onClose() {
    this.root?.unmount();
  }
}
