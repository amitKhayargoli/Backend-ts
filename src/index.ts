import express , { Application, Request, Response } from 'express';
import  bookRoutes  from './routes/book.route';

const app: Application = express();
const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});
app.use('/api/books', bookRoutes); 

app.listen(
    PORT, 
    () => {
        console.log(`Server on http://localhost:${PORT}`);
    }
);
