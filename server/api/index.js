import Koa from 'koa';
import auth from './routes-auth';

const app = new Koa();

app.use(auth);
export default app;
