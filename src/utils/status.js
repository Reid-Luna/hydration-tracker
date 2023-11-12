import Settings from "./settings";
export default class Status {
  plugin;
  totals;

  static getTotalsDirectly(file) {
    if (!file) return 0;
    else {
      let lines = file.split("\n");
      let [o, l, p] = lines
        .reduce(
          ([o, l, p], line) => {
            let [t, a, m] = line.split("•");
            return m == "ounce"
              ? [[...o, a], l, p]
              : m == "pint"
              ? [o, l, [...p, a]]
              : m == "liter"
              ? [o, [...l, a], p]
              : [o, l, p];
          },
          [[], [], []]
        )
        .map((t) => t.reduce((p, c) => Number(p) + Number(c), 0));
      return [o, l, p];
    }
  }

  constructor(plugin) {
    this.plugin = plugin;
    this.plugin.statusbar = this.plugin.addStatusBarItem();
  }

  getTotals(file) {
    if (!file) return (this.totals = 0);
    else {
      let lines = file.split("\n");
      let [o, l, p] = lines
        .reduce(
          ([o, l, p], line) => {
            let [t, a, m] = line.split("•");
            return m == "ounce"
              ? [[...o, a], l, p]
              : m == "pint"
              ? [o, l, [...p, a]]
              : m == "liter"
              ? [o, [...l, a], p]
              : [o, l, p];
          },
          [[], [], []]
        )
        .map((t) => t.reduce((p, c) => Number(p) + Number(c), 0));
      this.totals = { ounce: o, liter: l, pint: p };
      Object.keys(this.totals).map(
        (m) => this.totals[m] <= 0 && delete this.totals[m]
      );
      return `💧 ${Object.keys(this.totals)
        .map(
          (m) =>
            `${this.totals[m]} ${Settings.AcceptedMeasurements[m].measurement}`
        )
        .join(" • ")}`;
    }
  }

  updateStatusBar(text) {
    this.plugin.statusbar.setText(text);
  }

  async Run() {
    let file = await this.plugin.log.Read();
    let totals = this.getTotals(file);
    this.updateStatusBar(totals);
  }
}
