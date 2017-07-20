![Pixel Wall Logo](./images/PixelWallLogo.png)

# PixelWall
> An IoT interactive pixel wall implementation

This project is an implementation of an LED wall controlled through the internet with the use of node, vue.js, johnny-five.js, and a microcontroller.

## Installing / Getting started

Using the fubarinoSD microcontroller, you must first run the StandardFirmataChipKITledstrip.ino file in order to create the protocol for communicating with the microcontroller using node and johnny-five. This only needs to be done once for setting up the microcontroller.

Once the microcontroller is set up for communication, run the following:

```shell
npm init
```

This should install all the dependencies required for the project to run.
Now connect the fubarinoSD to your computer and run the listSerialPort.js file.

```shell
node listSerialPort.js
```

This tells node what port the microcontroller is connected to in order to send our commands.

The microcontroller should now be setup to receive commands.

## Developing

### TO DO
### Built With
List main libraries, frameworks used including versions (React, Angular etc...)


### Prerequisites

What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/your/your-project.git
cd your-project/
packagemanager install
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Versioning

### TO DO
We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).


## Configuration

### TO DO
Here you should write what are all of the configurations a user can enter when
using the project.

## Tests

### TO DO
Describe and show how to run the tests with code examples.
Explain what these tests test and why.

```shell
Give an example
```

## Style guide

### TO DO
Explain your code style and show how to check it.

## Api Reference

### TO DO
If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.


## Database

### TO DO
Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc...

## Licensing

This project is licensed under the Apache License 2.0.
For a copy of this license please go [here](https://www.apache.org/licenses/LICENSE-2.0.html).
