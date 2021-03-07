import { createHash } from "crypto";

export function md5(string) {
  return createHash("md5").update(string).digest("hex");
}

export function createPage(title) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset=utf-8 />
        <title>${title}</title>
        <link rel="favicon href="https://remix.run/favicon.ico"/>
      </head>
      <body>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/page-1">Page 1</a>
            </li>
            <li>
                <a href="/page-2">Page 2</a>
            </li>
            <li>
                <a href="/page-3">Page 3</a>
            </li>
            <li>
                <a href="/page-4">Page 4</a>
            </li>
        </ul>
        <h1>${title}</h1>
        <hr />
        ${Array.from({ length: 1000 }).map(() => "<div>I am junk</div>")}
      </body>
              
    </html>
  `;
}
