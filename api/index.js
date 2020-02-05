const cluster = require('cluster');
const cpus = require('os').cpus();

if (cluster.isMaster) {
	cpus.forEach(() => {
		cluster.fork();
	});
} else {
	console.log(`Worker ${process.pid} started`);
	require('./server.js'); // eslint-disable-line global-require
}
