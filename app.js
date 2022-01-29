import { getImages } from './api.mjs'
import koa from 'koa'
import koaRouter from 'koa-router'
import fetch from 'node-fetch'
//const koa = require('koa')
//const koaRouter = require('koa-router')

const app = new koa()
const router = new koaRouter()




// logger
/**
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
 */

  
  //Middleware example
  router.get('/test',async  ctx =>{
    const images = await getImages()
    ctx.body={
      status:200,
      data:images.photos.photo[0].server
    }
  });

  //Router middleware
  app.use(router.routes()).use(router.allowedMethods());

  // response
  //getImages().then(data => console.log("https://live.staticflickr.com/" + data.photos.photo[0].server + "/" + data.photos.photo[0].id + "_"+data.photos.photo[0].secret+".jpg"))
  app.use(async ctx => {
    ctx.body = "test"
  });
  app.listen(3000);