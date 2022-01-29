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
    const images = await getImages() //fetches images from the flickr api
    console.log(images)

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods','GET');
    ctx.set('Content-type', 'application/json');

    ctx.body={
      status:200,
      data:images
    }
  });

  //Router middleware

  app.use(router.routes()).use(router.allowedMethods());
  app.listen(3000);