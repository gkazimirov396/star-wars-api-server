import express from 'express';

import morgan from 'morgan';
import helmet from 'helmet';
import expressLayouts from 'express-ejs-layouts';

import apiRoutes from './routes/api.js';
import imageRoutes from './routes/image.js';

import errorController from './controllers/errorController.js';

const app = express();
const PORT = process.env.PORT ?? 5000;

app.set('view engine', 'ejs');
app.set('layout', './layout/main');

app.use(express.static('public'));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(expressLayouts);

app.use('/api', apiRoutes);
app.use('/image', imageRoutes);

app.use('*', errorController.getNotFoundPage);

app.use(errorController.getErrorPage);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
