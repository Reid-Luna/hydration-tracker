import { Notice, Plugin } from "obsidian";

import {
  Settings,
  Modal,
  View,
  SettingsTab,
  Transaction,
  Log,
  Status,
} from "./utils";

export default class Hydrate extends Plugin {
  settings = Settings.DefaultSettings;

  async loadSettings() {
    this.settings = await this.loadData();
    this.settings = this.settings || Settings.DefaultSettings;
    console.log("loaded settings", this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
    console.log("saved settings", this.settings);
  }

  onload() {
    this.loadSettings();
    this.addSettingTab(new SettingsTab(this)); // @todo: make settings better

    this.addRibbonIcon(
      "glass-water",
      "Add Water Intake",
      (
        e // @todo: make modal pretty
      ) => this.activateModal()
    );

    this.registerExtensions(Settings.AcceptedExtensions, Settings.ViewType);

    this.log = new Log(this.settings.Log);
    this.log
      .Initiate(this.app.vault)
      .then((f) => console.log("log initiated", f.basename, f.extension));

    this.status = new Status(this);
    this.status.Run();

    this.registerInterval(window.setInterval(() => this.status.Run(), 1000));
    this.registerView(Settings.ViewType, (leaf) => new View(leaf, this));
  }

  async activateModal() {
    return new Modal(
      this.app,
      async (amt, meas) => {
        console.log(amt, meas);
        const transaction = new Transaction(this.log, amt, meas);

        await transaction.Save();

        // @todo make congratulation module
        new Notice(`You drank ${amt} ${meas.full}s, keep it up!`);
      },
      this.settings
    ).open();
  }
}
