import * as TOML from 'smol-toml'
import fs from "node:fs/promises";
import Handlebars from "handlebars";
import path from "node:path";

const PARTIALS_PATH = "src/partials";
const ASSETS_PATH = "src/assets";
const TEMPLATES_PATH = "src/templates";

await fs.rm("build", { recursive: true, force: true });
console.info("Cleared build/");

// Copy assets directly
await fs.cp(ASSETS_PATH, "build/assets", { recursive: true });
console.info(`Copied assets from ${ASSETS_PATH}`);

// Register some useful helpers
Handlebars.registerHelper("default", (value, defaultValue) => value != null ? value : defaultValue);

Handlebars.registerHelper('assign', (name, value, options) => {
    if (!options.data.root) {
        options.data.root = {};
    }
    options.data.root[name] = value;
});

// Register partials
{
  const partialsDirEntries = await fs.readdir(PARTIALS_PATH, {
    withFileTypes: true,
  });
  for (const partialsDirEntry of partialsDirEntries) {
    const partialName = path.parse(partialsDirEntry.name).name;
    const joinedPath = path.join(
      partialsDirEntry.parentPath,
      partialsDirEntry.name,
    );
    Handlebars.registerPartial(
      partialName,
      await fs.readFile(joinedPath, "utf-8"),
    );

    console.info(`Registered partial ${partialName} from ${joinedPath}`);
  }
}

// Generate and register the writing_index partial
{
  const toml = TOML.parse(await fs.readFile("writing.toml", "utf-8"));
  const entries = toml["entry"];
  for (const entry of entries) {
    const dateString = entry["published"].toISOString();
    entry["published"] = dateString.slice(0, dateString.indexOf("T"));
  }
  const template = Handlebars.compile(
`
<ul>
    {{#each entries}}
      <li><a href="/writing/{{slug}}/">{{{title}}}</a> (<time datetime="{{published}}">{{published}}</time>)</li>
    {{/each}}
</ul>
`
  );

  const name = "writing_index";
  Handlebars.registerPartial(name, template({entries: entries}));
  console.info(`Registered partial ${name} (generated)`);
}

// Compile and output the result of evaluating regular templates
const entries = await fs.readdir(TEMPLATES_PATH, {
  recursive: true,
  withFileTypes: true,
});

for (const entry of entries) {
  const joinedPath = path.join(entry.parentPath, entry.name);
  const parsedPath = path.parse(joinedPath);
  if (!entry.isFile()) {
    continue;
  }

  const template = Handlebars.compile(await fs.readFile(joinedPath, "utf-8"), {
    preventIndent: true,
  });

  const outDir = path.join(
    "build",
    path.relative(TEMPLATES_PATH, entry.parentPath),
  );
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, parsedPath.name + ".html");
  await fs.writeFile(outPath, template({canonical_url: getCanonicalUrl(path.relative(TEMPLATES_PATH, joinedPath))}));

  console.info(`Wrote result of ${joinedPath} to ${outPath}`);
}

function getCanonicalUrl(relativePath) {
  return `https://arjunsatarkar.net${path.join("/", relativePath).replace(/(.*\/)index\.hbs$/, "$1")}`;
}
