var peepsImport: { [key: string]: string } = {};
for (let i = 1; i <= 8; i++) {
  peepsImport['peeps' + i] = require(`./peep-${i}.png`);
}

export { peepsImport };
