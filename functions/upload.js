export async function onRequestPost(context) {  // Contents of context object  

    
    
    const {   
        request, // same as existing Worker API    
    env, // same as existing Worker API    
    params, // if filename includes [id] or [[path]]   
     waitUntil, // same as ctx.waitUntil in existing Worker API    
     next, // used for middleware or to fetch assets    
     data, // arbitrary space for passing data between middlewares 
     } = context;
     context.request
     const url = new URL(request.url);

    let Referer = request.headers.get('Referer') || "Referer"
    let refererUrl = new URL(Referer)
 
    let refererCorde = refererUrl.searchParams.get('Authorization');

    let authorization = request.headers.get('Authorization') || refererCorde
    console.log('Authorization',authorization)

    if (authCode != env.BASIC_PASS) {
        return new UnauthorizedException('auth error.')
    }
    

     const response = fetch('https://telegra.ph/' + url.pathname + url.search, {
         method: request.method,
         headers: request.headers,
         body: request.body,
     });
    return response;
  }
  
  function UnauthorizedException(reason) {
    return new Response(reason, {
      status: 401,
      statusText: "Unauthorized",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        // Disables caching by default.
        "Cache-Control": "no-store",
        // Returns the "Content-Length" header for HTTP HEAD requests.
        "Content-Length": reason.length,
      },
    });
  }
