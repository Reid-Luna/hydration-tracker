export default class Log {
  file_path;
  vault;
  file;
  cachedData;

  constructor(file_path) {
    this.file_path = file_path;
  }

  async Initiate(vault, file_path) {
    this.file_path = file_path || this.file_path;
    this.vault = vault;

    const files = this.vault.getFiles();
    files.filter(
      ({ basename, extension }) => `${basename}.${extension}` == this.file_path
    );

    if (files.length === 0) return this.vault.create(this.file_path, "");
    else {
      this.file = files[0];
      return Promise.resolve(this.file);
    }
  }

  async Write(data) {
    return this.vault.append(this.file, data);
  }

  async Read() {
    return this.vault.cachedRead(this.file);
  }
}
