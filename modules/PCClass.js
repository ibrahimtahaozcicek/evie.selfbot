const PersistentCollection = require("djs-collection-persistent");

class PCClass extends PersistentCollection {
  constructor(client, PCName) {
    super({name: PCName});
    this.client = client;
    this.type = PCName.toLowerCase().slice(0, -1);
  }

  add(name, data) {
    return new Promise((reject, resolve) => {
      if(this.has(name))
        return reject(`The ${this.type} \`${name}\` already exists.`);
      if(this.client.commands.get(name) || this.client.commands.get(client.aliases.get(name)))
        return reject(`A command of this name exists, cannot add ${this.type}.`);
      this.set(name, extra.join(" "));
      resolve(`The new ${this.type} \`${name}\` was added to the database.`);
    });
  }

  del(name) {
    return new Promise((reject, resolve) => {
      if(!this.has(name))
        return reject(`The ${this.type} \`${name}\` does not exist.`);
      this.delete(name);
      resolve(`The ${this.type} \`${name}\` has been deleted`)
    });
  }

  rename(oldName, newName) {
    return new Promise((reject, resolve) => {
      if(!this.has(oldName))
      return reject(`The ${this.type} \`${name}\` does not exist.`);
      const entry = this.get(oldName);
      this.set(newName, entry);
      this.delete(oldName);
      resolve();
    });
  }

  list() {
    return "```\n" + this.map((s,k) =>k).join(", ") + "\n```";
  }

  help() {
    return this.extendedHelp;
  }
}

module.exports = PCClass;
