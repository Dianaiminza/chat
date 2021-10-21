const config = require('./config');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
var  http =require ('http');
const server = require('http').createServer(app);
var  Server =require('socket.io');
mongoose.connect();

server.listen(config.port, config.host, () => {
  console.log('--');
  console.info('Chatting App');
  console.log();
  console.info(`Environment:       ${config.env}`);
  console.info(`Server:            ${config.host}:${config.port}`);
  console.log('--');
});
if(process.env.NODE_ENV ==='production'){
  app.use(express.static('frontend/build'));
  
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend','build','index.html'));
  
  });
  }
  const httpServer = http.Server(app);
const io =Server(httpServer, { cors: { origin: '*' } });
// require('./api/sockets').initSocket(app, server);
httpServer.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  
module.exports = app;