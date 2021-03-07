# Example 1
A simple vanilla HTTP server, no frameworks or magic.

## Getting Started
If you run the command `npm run start` it will run the `example-1` folder's server.

### Obeservation 1
If you open your browser at `http://localhost:3000/` and open your browser's developer tools,
you'll see that the homepage and `Page 1` are both 22kb when we download them from the server.

You can read about `bfcache` AKA Back/Forward Cache from Google's detailed blog post here: https://web.dev/bfcache/.
A callout about HTTP Cache vs BF Cache
> The bfcache is a snapshot of the entire page in memory (including the JavaScript heap), whereas the HTTP cach
> contains only the responses for previously made requests.


### Observation 2
If you click on `Page 1` link to navigate to that page and then hit the browser's back button, you'll see that the file will be served the cache instead of refetching from the server.
This is default browser behavior, that when you click the forward or back button it servers the data from the cache. (Ex: try on goodreads.com)


### Observation 3
If you click on `Page 2` the first time, you'll see it will send about 22kb of data. If you refresh the page, it will only send 113 bytes.
This is a relatively big difference when transmitting data over the wire. 1kb === 1000 bytes.

## Obeservation 4
Observation 3 was a big improvement in that the client only needs to send a header to server to determine if the content has changed or not.
This can be helpful especially if getting the result of a new page can take a decent amount of time (imagine needing to do a database query or fetch from disk etc).

## Observation 5
Is there a way we can improve on not need to talk to the server and still get content from our cache? Yep.

In this example, we'll give `max-age` a value of 10, which instructs the browser to not go back to the server if the `max-age` value has not expired.
So if we load `Page 3` the first time you'll see its not from the cache. If you click the `Page 1` link, then click `Page 3` you'll see it fetched from the cache.

If you open 2 browser tabs:
Tab2
- one page 1, then immediately click page 3
    - click page 3 
Tab2
- one is on page 2, then immediately click page 3 (CACHE HIT)

But if you immediately reload the page and keeping doing so before the expire time hits
your browser will be the one serving the content instead of needing to go to the server.

NOTE: if you reload the page with `cmd-r` it will not use the cache, but if you click a link (page 1) then go to page3, it will use the cache.
- https://stackoverflow.com/questions/11245767/is-chrome-ignoring-cache-control-max-age

## Related Reads
- [MDN - Page Transition Event](https://developer.mozilla.org/en-US/docs/Web/API/PageTransitionEvent)
- [Google Dev - Page LifeCycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api)