export async function onRequestPost(context) {  // Contents of context object  

    // 假设我们有如下预定义的允许访问的IP地址列表
    const whitelistIPs = ['127.0.0.1', '124.16.4.5']; // 示例IP，实际应用中应替换为你的白名单IP

    // 获取请求的远程IP地址，这取决于你的服务器或代理设置，常见从请求头中提取
    const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || request.socket.remoteAddress;

    // 检查IP是否在白名单内
    if (!whitelistIPs.includes(clientIP)) {
        return new Response('Access Denied: Your IP is not whitelisted.', { status: 403 });
    }
    
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
     const response = fetch('https://telegra.ph/' + url.pathname + url.search, {
         method: request.method,
         headers: request.headers,
         body: request.body,
     });
    return response;
  }
  
