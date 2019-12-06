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
