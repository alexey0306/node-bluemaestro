# node-bluemaestro
Node-RED module to read data from Blue Maestro sensors

# Installation

## Step 1. Download Noble and configure the passive scanning
In this step we need to download the Noble JS library and configure the Passive scanning. This is required in order to read Advertisements from BlueMaestro sensors. Please follow these steps:

1. Clone the Noble JS library.
```
cd /home/azelenkin
git clone https://github.com/noble/noble.git
```
2. Go to Noble directory and open file **lib/hci-socket/hci.js**. 
```
vi /home/azelenkin/lib/hci-socket/hci.js
```
3. Find the **Hci.prototype.setScanParameters** function and change this line: 
```
// data
cmd.writeUInt8(0x01, 4); // type: 0 -> passive, 1 -> active
```
to this: 
```
// data
cmd.writeUInt8(0x00, 4); // type: 0 -> passive, 1 -> active
```
4. Save file

## Step 2. Installing the Noble Node RED library
In this step we will install the special Node RED Noble library, which allows to Scan BLE devices and read data from them. Please follow these steps: 

1. Clone the Node-RED Noble library
```
cd /home/azelenkin
git clone https://github.com/kmi/node-red-contrib-noble.git
```
2. Go to cloned folder and open **package.json** file. 
```
cd /home/azelenkin/node-red-contrib-noble
vi package.json
```

3. Change the following line: 
```
"dependencies": {
    "noble": ">=0.2.7"
  },
```
to 
```
"dependencies": {
    "noble": "file://home/azelenkin/noble"
  },
```

## Step 3. Installing the Node-RED Noble library
In this step we will install the Node-RED Noble library as Node-RED module. In previous step we've changed the **noble** dependency to local one with Passive Scanning configured. In this step I am assuming the Node-RED is already installed on your system

1. Install the Noble Node-RED module using the following command:
```
cd ~/.node-red
npm install /home/azelenkin/node-red-contrib-noble/
```
2. Restart the Node-RED server
3. If everything is fine, you should see the Scan BLE node in **advanced** section. 
<img width="256" alt="Screenshot 2019-12-06 at 11 21 52" src="https://user-images.githubusercontent.com/10444834/70315800-a6826080-181a-11ea-9655-a3598d911aeb.png">


## Installing the Node-RED BlueMaestro library. 
In this step we will install a small Node-RED module that allows to read temperature values from BlueMaestro sensors. Please follow these steps: 

1. Clone the repo
```
cd /home/azelenkin
git clone https://github.com/alexey0306/node-bluemaestro.git
```
2. Install it as a Node-RED module
```
cd ~/.node-red
npm install /home/azelenkin/node-bluemaestro
```
3. Restart Node-RED server

4. If everything is fine, you should see **bluemaestro** block in the Advanced section
<img width="210" alt="Screenshot 2019-12-06 at 11 30 32" src="https://user-images.githubusercontent.com/10444834/70316371-da11ba80-181b-11ea-8482-08b2480338ff.png">

## Step 4. Testing the BlueMaestro node. 
In this step we will create a small dataflow that will start/stop BLE scan, identify the BlueMaestro devices and collect the temperature values from them. Please follow these steps: 

1. Connect the Node-RED dashboard and create a new dataflow.
2. Drag two **Inject** node to the work area. 
3. Double click the first **Inject** block and configure it with the following data: 

![Screenshot 2019-12-06 at 11 34 34](https://user-images.githubusercontent.com/10444834/70316657-7471fe00-181c-11ea-9f27-7b614e1f5bb0.png)

4. Double the second **Inject** block and configure it with the following data:

![Screenshot 2019-12-06 at 11 36 24](https://user-images.githubusercontent.com/10444834/70316766-a6836000-181c-11ea-976c-1c96544c6693.png)

5. Drag the **scan ble** block to the work area and configure it with the following data: 
   ```
   Name: Scan BLE
   Allow Duplicates: True
   ```
6. Take the output of **Stop Scanning** block and attach it to the input of **Scan BLE** block. Do the same for **Start Scanning** block. In the end you should have something like the following: 

![Screenshot 2019-12-06 at 11 50 30](https://user-images.githubusercontent.com/10444834/70317728-9ff5e800-181e-11ea-9449-574f4487eb4d.png)

7. Drag the **bluemaestro** block to work area. Attach the output of **Scan BLE** block to the input of **BlueMaestro** block.
8. Drag the **debug** block to work area and attach the output of **BlueMaestro** block to the input of **debug** block. In the end you should have something like the following: 

![Screenshot 2019-12-06 at 11 52 41](https://user-images.githubusercontent.com/10444834/70317884-f82cea00-181e-11ea-8be0-d1a6cfe1fd3d.png)


9. Deploy the dataflow. Make sure that it is running and you see no errors, exceptions and etc. 
10. Open the debug panel and you should see the following messages: 

```
msg.payload : Object
{ uuid: "d585e89f7b2f", type: "0d", temperature: "00dc", rssi: -80 }
msg.payload : Object
{ uuid: "d585e89f7b2f", type: "0d", temperature: "00db", rssi: -80 }
msg.payload : Object
{ uuid: "e6b072e59f32", type: "0d", temperature: "00dd", rssi: -80 }
```

Where, 
* **uuid**: BLE sensor MAC address
* **temperature**: Temperature value in HEX format. For example **00dd** (HEX) = **221** => **22.1** Celsius

