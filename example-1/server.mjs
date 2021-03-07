import { createServer } from 'http';
import { createPage, md5} from './utils.mjs';
const PORT = 3000;
const ROUTES = {
    HOMEPAGE: '/',
    PAGE1: '/page-1',
    PAGE2: '/page-2',
    PAGE3: '/page-3',
}


let server = createServer((request, response ) => {
    switch(request.url){
      case ROUTES.HOMEPAGE: {
        let html = createPage("Home");
        response.writeHead(200, {
          // NOTE: This disables caching of the homepage entirely. It even disables the `bfcache`.
          "cache-control": "no-store",
        })
        response.end(html);
        break
      }
      case ROUTES.PAGE1: {
        let html = createPage("Home");
        response.writeHead(200);
        response.end(html);
        break
      }
        
      case ROUTES.PAGE2: {
        let html = createPage("Page1");
        const etag = md5(html); // generate a unique etag using the page content.

        const pageHasNoChange = etag === request.headers["if-none-match"];
        if(pageHasNoChange) {
          response.writeHead(304);
          response.end()
        }
        else {
          response.writeHead(200, {
            /* NOTE: 
                cache-control
                  max-age=0: 
                    "this expires the second we get the page"
                  must-revalidate: 
                    "come back to the server and find out of the content has changed or not. 
                    I the server will tell you if the page is different or not. If different, I'll serve you the new page,
                    otherwise, I won't send anything back to you. (you pay a minor cost to ask the server, but its ok..its only sending headers".
                etag: 
                  this is an expire tag, which should be some unique identifier. 
            */
            "cache-control": "max-age=0, must-revalidate",
            "etag": etag
          })
          response.end(html);
        }
        
        break
      }

      case ROUTES.PAGE3: {
        let html = createPage("Page3");
        response.writeHead(200, {
          /* NOTE: 
            cache-control
              max-age=10: 
                "im going to tell the browser that this page expires 10 seconds after it recieves it. If the page is requested
                before the max-age value is fulfilled, let the browser serve the page from the cache and not come to me."
          */
          "cache-control": "max-age=10"
        })
        response.end(html);
        break;
      }
    }
})

server.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
})