import { PluginSettingTab, Setting } from "obsidian";
import Settings from "./settings";

export default class SettingsTab extends PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h1", { text: "Hydrate - Settings" });

    const settingElems = {};
    Object.keys(Settings.DefaultSettings).map(
      (set) =>
        (settingElems[set] = {
          key: set,
          setting: new Setting(containerEl)
            .setName(set)
            .setDesc(Settings.DefaultSettingAlias[set]),
        })
    );

    settingElems.Log.setting.addDropdown(async (d) => {
      let files = await this.app.vault.getFiles();
      files = files
        .reduce(
          (p, f) =>
            Settings.AcceptedExtensions.includes(f.extension)
              ? [...p, { value: f.name, display: f.name }]
              : p,
          []
        )
        .map(({ value, display }) => d.addOption(value, display));

      d.onChange(
        (async (v) => {
          this.plugin.settings.Log = v;
          await this.plugin.saveSettings();
        }).bind(this)
      );

      d.setValue(this.plugin.settings.Log);
    });

    settingElems.Title.setting.addText((text) =>
      text
        .setPlaceholder(this.plugin.settings.Title)
        .onChange(async (value) => {
          this.plugin.settings.Title = value;
          await this.plugin.saveSettings();
        })
    );

    settingElems.Extension.setting.addDropdown(async (d) => {
      let exts = Settings.AcceptedExtensions.reduce(
        (p, e) => [...p, { value: e, display: e }],
        []
      ).map(({ value, display }) => d.addOption(value, display));

      d.onChange(
        (async (v) => {
          this.plugin.settings.Extension = v;
          await this.plugin.saveSettings();
        }).bind(this)
      );

      d.setValue(this.plugin.settings.Extension);
    });

    settingElems.Measurement.setting.addDropdown(async (d) => {
      let exts = Object.values(Settings.AcceptedMeasurements)
        .reduce((p, { full }) => [...p, { value: full, display: full }], [])
        .map(({ value, display }) => d.addOption(value, display));

      d.onChange(
        (async (v) => {
          this.plugin.settings.Measurement = Settings.AcceptedMeasurements[v];
          this.plugin.settings.Goal = Settings.DefaultGoals[v];
          this.plugin.settings.AutoConsumptionAmount =
            Settings.DefaultConsumptionAmount[v];
          await this.plugin.saveSettings();
        }).bind(this)
      );

      d.setValue(this.plugin.settings.Measurement.full);
    });

    settingElems.Goal.setting.addText((text) =>
      text.setPlaceholder(this.plugin.settings.Goal).onChange(async (value) => {
        this.plugin.settings.Goal = value;
        await this.plugin.saveSettings();
      })
    );

    settingElems.Separator.setting.addText((text) =>
      text
        .setPlaceholder(this.plugin.settings.Separator)
        .onChange(async (value) => {
          this.plugin.settings.Separator = value;
          await this.plugin.saveSettings();
        })
    );

    settingElems.AutoConsumptionAmount.setting.addText((text) =>
      text
        .setPlaceholder(this.plugin.settings.AutoConsumptionAmount)
        .onChange(async (value) => {
          this.plugin.settings.AutoConsumptionAmount = value;
          await this.plugin.saveSettings();
        })
    );
  }
}
