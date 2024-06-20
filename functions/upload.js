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

    const url = new URL(request.url); // 假设 request.url 格式正确

// 优化变量名，遵守 JavaScript 变量命名习惯
let refererHeader = request.headers.get('Referer') || "about:blank";
let refererUrl;
try {
  refererUrl = new URL(refererHeader);
} catch (error) {
  console.error("Invalid Referer URL:", error);
  refererUrl = new URL("about:blank"); // 处理异常，避免后续逻辑失败
}

let refererCode;
try {
  refererCode = refererUrl.searchParams.get('Authorization');
} catch (error) {
  console.error("Error parsing Referer URL parameters:", error);
  refererCode = null; // 处理异常，确保变量类型一致
}

refererCode = refererCode || "auth_code"; // 优化逻辑，避免使用过于冗长的变量名

let authorization = request.headers.get('Authorization') || refererCode;
// 移除敏感信息的 console.log 输出，替换为适当的日志记录机制
// console.log('Authorization', authorization);

    if (authorization != env.BASIC_PASS) {
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
