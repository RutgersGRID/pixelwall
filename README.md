![Pixel Wall Logo](./images/PixelWallLogo.png)

# PixelWall
> An IoT interactive pixel wall implementation

This project is an implementation of an LED wall controlled through the internet with the use of node, vue.js, johnny-five.js, and a microcontroller. This repository holds the code required for setting up the physical microcontroller and LED strip in order to properly receive and display images from the server. For the code that handles the communication between the LED wall and the users, please go [here](https://github.com/RutgersUniversityVirtualWorlds/pixelserver).

## Installing / Getting started

In order to complete setup for the fubarinoSD microcontroller, you must compile the StandardFirmataChipKITLEDStrip.ino file using the Arduino IDE in order to create the protocol for communicating with the microcontroller using your computer. This only needs to be done once for setting up the microcontroller.

To do this, you must first [add the board manager for fubarinoSD via URL from within the Arduino IDE](http://chipkit.net/wiki/index.php?title=ChipKIT_core) and then install the chipKIT board manager. Then you must install the Adafruit Dotstar LED Library from Sketch->Include Library->Manage Libraries... Finally select your microcontroller from Tools->Board(ChipKIT), set the serial port it is connected to, and compile the StandardFirmataChipKITLEDStrip.ino file on the fubarinoSD.

Note: you may want to configure the NUMPIXELS variable on StandardFirmataChipKITLEDStrip.ino to the number of LEDs in your LED strip before compiling.

Once the microcontroller is set up for communication, run the following at the root of the repository:

```shell
npm init
```

This should install all the dependencies required for the project to run.
Now connect the fubarinoSD to your computer and run the setup.js file.

```shell
node ./setup.js
```

This tells node what port the microcontroller is connected to in order to send our commands.

The microcontroller should now be setup to receive commands directly from node.


## Configuration

Configuration is managed by setup.js but manual configuration can be done at ./config/default.json.
In order for the LED to work need to indicate the port number it is connected to and the dimmensions of the wall in order to allow the proper display of images on the wall.

## Tests

To run the tests simply type the following:

```
npm test
```
Tests can be found in ./tests/ and are built on mocha and chai.

## Licensing

This project is licensed under the Apache License 2.0.
For a copy of this license please go [here](https://www.apache.org/licenses/LICENSE-2.0.html).
