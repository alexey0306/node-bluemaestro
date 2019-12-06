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






 
