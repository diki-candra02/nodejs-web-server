import http from 'http';

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
 
    response.statusCode = 200;

    const { url, method } = request;

    if(url === '/'){
        if(method === 'GET'){
            response.end('<h1>Hello!</h1>');
        }else{
            response.end(`<h1>anda tidak dapat mengakses dengan<b>${method}</b>`);
        }
    }else if(url === '/about'){
        if(method === 'GET'){
            response.end('<h1>Halo! Ini adalah halaman about</h1>');
        }else if(method === 'POST'){
            let body = [];

            request.on('data', (chuck) => {
                body.push(chuck);
            })

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            })
        }else{
            response.end(`<h1>anda tidak dapat mengakses dengan<b>${method}</b>`);
        }
    }else{
        response.end('Halaman tidak ditemukan!');
    }
};
 
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});