export default class {
  static ViewType = "HYDRATE";
  static AcceptedExtensions = ["water", "hydrate", "hydration"];
  static AcceptedMeasurements = {
    ounce: { full: "ounce", abrv: "fl oz", measurement: "OZ" },
    liter: { full: "liter", abrv: "l", measurement: "L" },
    pint: { full: "pint", abrv: "pt", measurement: "Pt" },
  };
  static DefaultGoals = { ounce: 100, liter: 3, pint: 6 };
  static DefaultConsumptionAmount = { ounce: 32, liter: 1, pint: 2 };

  static DefaultSettings = {
    Log: "Log.water",
    Title: "Water Intake",
    Extension: "water",
    Measurement: { full: "ounce", abrv: "fl oz", measurement: "OZ" },
    Goal: 100,
    Separator: "•",
    AutoConsumptionAmount: 32,
  };

  static DefaultSettingAlias = {
    Log: "Location of log",
    Title: "Title of graph",
    Extension: "Log file path extension",
    Measurement: "Unit of measurement",
    Goal: "Daily consumption goal",
    Separator: "Symbol used to separate log",
    AutoConsumptionAmount: "Autofill amount to consume in menu",
  };
}
