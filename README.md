## Contents of this Document

Note: This is a working experimental version and so the README is a little rusty

## TODOs: 
### 1. Update Readme
The readme has not been proof read below the TODOs. This needs to be updated and expanded on.

### 2. Use Observables
Fix up the way subscribing to state change happens. My idea is that this will become an Observable. [This article](https://github.com/reactjs/redux/issues/303#issuecomment-125184409) goes into it a little bit but I still don't understand it enough. 
[This project](https://github.com/acdlite/redux-rx) also might be helpful for this.

### 3. Create a UI
In the view folder I still need to create a UI of some description.
I was thinking of either a dojo or react front end, or even possibly doing both.

### 4. Create a more detailed layers/toc module
In this it would be a more powerful layers and toc module that will handle everything to do with adding, removing layers and any other action that may be performed from a toc.
This can grow with each project to include more and functionality. This way any action for any new application will easily become part of the next application.

### 5. Write an architecture doc
I want to write a document to describe some of the decisions, why I did it, and some other explinations on what to do in the future.

### 6. ES6 and Webpack
Create this same application in ES6 and webpack. 

### 7. Package each module
Make each module packagable and have no/minimal dependencies. That way you could bower/npm the packages and include them into a new application to include state mapping

### 8. Add some jsdoc
Add some jsdoc and comment what's happening. Currently I haven't written any because things have changed so much during the experimental stage


## Summary

## The Idea

The goal of the project is to clearly define the interface between the work of the designers and that of the map makers.  An example prototype of this interface will set out a framework for the delivery of projects between external UI/UX vendors and the Map Logic. 
There will also be benefits for all future projects as it will provide a way to separate the code between different developers. Currently some research has identified [Redux](http://redux.js.org/) as the framework that looks most promising.


## Summary

Develop a simple example web map project in JavaScript that has a clear separation between the business logic and the UI code. This will use [Redux](http://redux.js.org/) as the communication between the 2 separate sections of the code. The example will build on work already done in a boilerplate Esri map library [esri-redux](https://github.com/reactjs/redux) and alter it to suit a team which separates the UI & business logic as we do.

### Deliverables

+ Create a simple map using dojo that provides all the logic for handling operations from the UI components on the map.  
+ An example UI component library that will send event data to the map.
+ Develop a library/framework using Redux to handle the event data and actions raised between the map logic and the UI.


### Benefits & Goals

+ Creates a modern, scalable & traceble framework for communication
  between the UI and business logic
+ Uses cutting edge javascript
+ Custom web map work is only going to grow
+ Identify the relationship between external vendors
+ Set boundaries & responsibilies between the different teams
+ Provides a way to track the state of an application so we can
  reproduce and trace errors better
+ Provides a building block that assists with one of the biggest
  challenge we face; a way to automate testing of the application


## Contents of this Document

This document outlines the key endpoints that define the system,
provides instructions on how to build the system, and the steps
required to deploy the system.  The document is broken up into the
following parts:

+ A _Getting up and running for development_ guide for developers;
+ A _Code Repository Overview_ guide for code structure explanation;

## Getting up and running for development

To develop with you will need a number of pieces of software
installed:

* A text editor;
* Nodejs; and, 
* Mercurial/hg distributed source control software.  Some examples
  are:
  + TortoiseHG
  + SourceTree

### 1. Clone the repo to your own development environment.
### 2. Clone the source code repository

Git

### 2. Install Node.js

Download and install [nodejs](https://nodejs.org/en/download/)

* If working within the DNRM environment set the proxy for npm
```shell-session
> npm config set proxy http://username:password@web-prdproxy-usr.dmz:80/
> npm config set https-proxy http://username:password@web-prdproxy-usr.dmz:80/
```

### 3. Install grunt, bower and git

* Install git
Download and install [GIT] (https://git-scm.com/downloads)
  + When installing, select the options `Run GIT from the Windows Command Prompt` and `Use Windows' default console window` when they appear

After installing GIT, add the `C:\Program Files\Git\cmd` (assuming the default install location was used) to the user's PATH environment variable.

* Install grunt:
Open a command prompt and type

```shell-session
> npm install -g grunt-cli
```

* Install bower:

Update the proxy setting in .bowerrc 

```shell-session
> npm install -g bower
```

### 5. Install npm packages

In the command prompt navigate to the project directory e.g.
`C:\Projects\redux-grunt-map-basic`

```shell-session
> npm link
```

* If working within the DNRM environment set the proxybefore this stage
* In `environment.json` update the proxy details, username, password, proxy [web-prdproxy-usr.dmz], port [80] and run the following command
NOTE: if you have some special characters in your password this may not work and need quotes around parts of the config. 
```
> npm run updateproxy
```
This will add scripts/setproxy.bat to the root directory of the project with the following
and also setup the .bowerrc file details for bower packages
and then run the script to set the proxy details.

finally the following with install all the npm & bower packages

```shell-session
> npm install
```


### 5. Run the application

In the command prompt navigate to the project directory e.g.
`C:\Projects\redux-grunt-map-basic`

```shell-session
> grunt
```

### 6. Open application

* Now, switch back to your browser and enter the following url:
    + [http://localhost:9001/](http://localhost:9001/) This is the unbuilt version
    + [http://localhost:9002/](http://localhost:9002/) This is the dojo built version

### 7. Build Keymap

The keymap has been setup to be built using the [dojo build](https://developers.arcgis.com/javascript/latest/guide/using-bower/index.html#build-dojo). This will combine all the files necessary for the esri api and dojo and the keymap into a single minimised file. 
To update the version of the Esi js api you would need to update the esri bower package and check the latest [build.profile.js](https://github.com/Esri/jsapi-resources/tree/master/4.x/bower/dojo) 

The build is a little tricky so make sure you backup whenver it works. 

`esri/views/2d/layers/VectorTileLayerView2D` this section has been moved from a seperate layer to be included in the build as we are using Vector basemaps and it was erroring when it wasn't included.

#### Build commands

To `update` a build then do the following
```shell-session
npm run build
```

Every time you want to release a new `patch` version i.e. 1.1.2 - 1.1.3
```shell-session
npm run release-patch
``` 

Every time you want to release a new `minor` version i.e. 2.1.4 - 2.2.0
```shell-session
npm run release-minor
``` 

If the build is `failing` then you can run a build and view the errors using the following 
```shell-session
grunt compile -v
```

## Code Repository Overview

`src/` is the raw code before minification or concatenation or some other compilation - used to read/edit the code

`dist/src` is the prebuilt site. Grunt is used to setup the prebuilt code. This is used as the source by the dojo build

`dist/release/dnrm-keymap<version>` is the minified/concatenated version - actually used on production sites.


## Grunt Task Overview
+ `default` - default tasks to run when running grunt, this will build and deploy
+ `build-all` - does a full build of the application code in src & development
+ `build-min` - does a quick build so used while developing
+ `copy-all` - copies the built code to the dist/src directory
+ `build-ui` - builds the ui and packages it
+ `publish-dev` - publish the built code to the production folder
+ `publish-prod` - publish the un-built code to the production folder
+ `develop` - watches the files and runs a min build when a file changes
+ `server` - runs up the code and starts a server to test the built keymap
+ `dojobuild` - runs the dojo build and puts it in the dist/release directory
+ `after-build` - runs some other cleanup code for the dojo build
+ `deploy-s3` - deploy the keymap to amazon s3 [http://ea-js-test.s3-website-ap-southeast-2.amazonaws.com/](http://ea-js-test.s3-website-ap-southeast-2.amazonaws.com/) (requires credentials)

