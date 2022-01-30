import { getImages } from './flickr_calls.js'
import koa from 'koa'
import koaRouter from 'koa-router'


const app = new koa()
const router = new koaRouter()

//Used for logging
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });
  
  // x-response-time
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  
  //GET
  router.get('/images',async  ctx =>{
//    ctx.request.socket.setTimeout(5)
    try {
      const images = await getImages() //fetches images from the flickr api
      ctx.body={
        status:200,
        data:images
      }
    }
    catch (e){
      console.log(e)
      ctx.body={
        status:500,
        data:{error:e.code}
      }
    }
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods','GET');
    ctx.set('Content-type', 'application/json');
  });

  //Router middleware

  app.use(router.routes()).use(router.allowedMethods());
  app.listen(3000);