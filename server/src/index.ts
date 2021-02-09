import { app } from './app'
import { AddressInfo } from 'net';

const server = app.listen(
    3001,
    '0.0.0.0',
    () => {
        const {port, address} = server.address() as AddressInfo;
        console.info('Server listening on:','http://' + address + ':'+port);
});
