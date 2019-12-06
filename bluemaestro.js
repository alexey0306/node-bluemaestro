"use strict";
module.exports = function(RED){
  function BlueMaestroNode(config){
    RED.nodes.createNode(this,config);
    var node = this;
    node.on("input",function(msg){

      // Expecting the Manufacturer data
      if (!msg.advertisement || !msg.advertisement.manufacturerData) {
        return null;
      }

      // Getting the Manufacturer Data String
      let manufacturerDataString = msg.advertisement.manufacturerData.toString('hex');

      let manufacturerIdStart = 0;
      let manufacturerIdEnd = 4;

      // Blue Maestro manufacturer ID is 0x0133 but is little endian for some reason
      let blueMaestroID = "3301";

      // Ignore any non-Ruuvi tags
      if (manufacturerDataString.substring(manufacturerIdStart, manufacturerIdEnd) != blueMaestroID) {
          return null;
      }

      //console.log(msg);

      // Getting temperature
      let payload = {
        uuid: msg.peripheralUuid,
        type: manufacturerDataString.substring(4,6),
        temperature: manufacturerDataString.substring(16,20),
        rssi: msg.rssi
      };

      // Sending message
      msg.payload = payload;
      node.send(msg)
    });
  }

  RED.nodes.registerType("bluemaestro",BlueMaestroNode);
}
