import server from './server';
import colors from 'colors'

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(colors.green.bold(`Server listening on port ${port}`));
});
