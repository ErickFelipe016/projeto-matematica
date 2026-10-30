import React from "react";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import Home from "../client/src/pages/Home";
import NotFound from "../client/src/pages/NotFound";

const output = new URL("../dist/public/", import.meta.url);
const indexFile = new URL("index.html", output);
const shell = await readFile(indexFile, "utf8");
const marker = '<div id="root"></div>';
if (!shell.includes(marker))
  throw new Error("Container root não encontrado na saída Vite.");

await writeFile(
  indexFile,
  shell.replace(marker, `<div id="root">${renderToString(<Home />)}</div>`)
);

const notFound = shell
  .replace(marker, `<div id="root">${renderToString(<NotFound />)}</div>`)
  .replace(
    /<title>.*?<\/title>/,
    "<title>Página não encontrada — Matemática Inclusiva</title>"
  )
  .replace("</head>", '<meta name="robots" content="noindex" /></head>');
await mkdir(new URL("404/", output), { recursive: true });
await writeFile(new URL("404/index.html", output), notFound);
await writeFile(new URL("404.html", output), notFound);
console.log(
  "HTML estático criado com conteúdo completo e página 404 em português."
);
