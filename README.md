<b>Project</b>: SKF-Rolling-Stock

<b>Description</b>: A React app which displays data about Train(sensor info, values, condition, warning, alarms etc.)

<b>Browser Support</b>: Chrome 67+, Firefox 60+, Internet Explorer 10+

<b>Installation</b>:

Run the following command to get the project to your directory:
git clone git@git.geekyants.com:freelance/skf-rolling-stock.git
    
Setting up node modules for the project:

`npm install`
    
Set up .env file in your project directory:

Create `.env` file in the root of your project directory and paste the following in it:

`REACT_APP_API='http://localhost'
REACT_APP_API_PORT=3050`

Running the project once everything is setup:

`npm start`
    
Building project for deployment:

`npm run build`

Builds the app for production to the build folder.


<b>Folder Structure</b>:

    src_
        |_assets: contains fonts,images and styles used across the project
        |_components: contains common components used across the project
        |_containers: contains app layouts,header,sidebar and route authentication
        |_core: contains simple setup for fetch api.
        |_model: contains object models for bogie, coach, sensor, and submachine.
        |_routes: contains main pages and main routing for those pages.
        |_services: contains the whole api call and setup for the project.
        |_store: contains the whole app state tree of the project.
        |_tools: contains details about the proxy server and port it is going to connect.
        |_utils: contains constants used across the project.

<b>Public Folder</b>:

<b>Changing the HTML</b>:

The public folder contains the HTML file so you can tweak it, for example, to set the page title.
The `<script>` tag with the compiled code will be added to it automatically during the build process.


<b>Adding Assets Outside of the Module System</b>:

You can also add other assets to the public folder.

Note that we normally encourage you to import assets in JavaScript files instead.
For example, see the sections on adding a stylesheet and adding images and fonts.
This mechanism provides a number of benefits:


Scripts and stylesheets get minified and bundled together to avoid extra network requests.
Missing files cause compilation errors instead of 404 errors for your users.
Result filenames include content hashes so you don’t need to worry about browsers caching their old versions.


However there is an escape hatch that you can use to add an asset outside of the module system.

If you put a file into the public folder, it will not be processed by Webpack. Instead it will be copied into the build folder untouched.   To reference assets in the public folder, you need to use a special variable called PUBLIC_URL.

Inside index.html, you can use it like this:

`<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">`

Only files inside the public folder will be accessible by %PUBLIC_URL% prefix. If you need to use a file from src or node_modules, you’ll have to copy it there to explicitly specify your intention to make this file a part of the build.

When you run npm run build, Create React App will substitute %PUBLIC_URL% with a correct absolute path so your project works even if you use client-side routing or host it at a non-root URL.

In JavaScript code, you can use process.env.PUBLIC_URL for similar purposes:

    render() {
      // Note: this is an escape hatch and should be used sparingly!
      // Normally we recommend using `import` for getting asset URLs
      // as described in “Adding Images and Fonts” above this section.
      return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
    }
Keep in mind the downsides of this approach:


None of the files in public folder get post-processed or minified.
Missing files will not be called at compilation time, and will cause 404 errors for your users.
Result filenames won’t include content hashes so you’ll need to add query arguments or rename them every time they change.



When to Use the public Folder

Normally we recommend importing stylesheets, images, and fonts from JavaScript.
The public folder is useful as a workaround for a number of less common cases:


You need a file with a specific name in the build output, such as manifest.webmanifest.
You have thousands of images and need to dynamically reference their paths.
You want to include a small script like pace.js outside of the bundled code.
Some library may be incompatible with Webpack and you have no other option but to include it as a `<script>` tag.

<b>Maintaining The Project</b>:

    Speedometer Data Refresh Duration:
    
        Path: src/utils/appConstants
        Stored In: speedDataRefresh
        Default Value: 10000
        Data Format: millisecond

    Data Refresh for All Sensors Duration:
    
        Path: src/utils/appConstants
        Stored In: appDataRefresh
        Default Value: 600000
        Data Format: millisecond

    Timezone:
    
        Path: src/utils/appConstants
        Stored In: appTimeZone
        Default Value: "Asia/Singapore"
        Data Format: string(reference:https://momentjs.com/timezone/)

    Sensor Type List:
    
        Path: src/utils/appConstants
        Stored In: sensorTypes
        Default Value:{acc: "acc",env3: "env3",vel: "vel",temp: "temp"}
        Data Format: object(key:"value")

    Changing Proxy Server IP Address:
    
        Path: src/tools/proxyServer.js
        Stored In: observerStagingProxy : target
        Default Value: "http://114.111.138.197:6100/"
        Data Format: string(ip address)
        Description: Proxy server is being used becaus of CORS issue. so we use proxy server which acts as an middleware between the application and server.

<b>Bogie Asset Types</b>:

Contains Assets object related to a coach. Each sensor node belonging to a particular Asset will be inside this object by specifying the sensor object code.

<b>Example</b>:

    {
        dt: {                                                           // defines which coach
            wheelA1: {                                                  //object name w.r.t. Bogie asset name
            id: 1,                                                      //id of bogie asset
            name: "Wheel A1",                                           // actual bogie asset name in string format
            code: "wheelA1",                                            // code name for actual bogie asset written in the the form of camelcase
            className: "wheela1 arrow-up xs-up ",                       //class name for particular bogie asset
            placement: "left",                                          //placement of bogie asset on the bogie and coach image
            sensorNameArr: ["wheelA1Env3", "wheelA1Vel"], // name of all the sensor of the bogie asset
            boogieType: appConstants.wheelCategory.boogie1.code         // defines which bogie it belongs to
            }
        }
    }
One can create or modify bogie assets by following the given example.

<b>Store</b>:

The project uses Redux Store. It contains actions, constants and reducers directories.Functions in actions directory are used to dispatch actions to respective reducer specific to the case using the respective constants. This project uses combined reducers.

    Folder Structure of Store:

    Store_
          |_actions_
          |         |_boogie.action: contains bogie actions.
          |         |_coach.action: contains coach actions.
          |         |_dashboard.action: contains dashboard actions.
          |         |_login.action: contains login actions.
          |         |_reconnection.action: contains reconnection actions.
          |         |_root.action. : contains root actions.
          |         |_sensorTrendingForGraph.action: contains graph actions.
          |_constants_
          |         |_boogie.constant: contains bogie constant.
          |         |_coach.constant: contains coach constant.
          |         |_dashboard.constant: contains dashboard constant.
          |         |_login.constant: constant login constant.
          |         |_reconnection.constant: contains reconnection constant.
          |         |_root.constant: contains root constant.
          |         |_sensorTrendingForGraph.constant: contains graph constants.
          |_reducers_
          |          |_index.js: main reducer which creates the combined reducer.
          |          |_boogie.reducer: contains bogie reducer.
          |          |_coach.reducer: contains coach reducer.
          |          |_dashboard.reducer: contains dashboard reducer.
          |          |_login.reducer: reducer login reducer.
          |          |_reconnection.reducer: contains reconnection reducer.
          |          |_sensorTrendingForGraph.reducer: contains graph reducer.
          |_index.js: creates the store using the main reducer.

<b>Observer Service</b>:

Observer Service is the main file to create api calls for the project. One can call all the api’s required using these functions:

<b>API Calls</b>: 

All API calls are handled by the observerService. When an API call is made, The API call is pushed into a priority queue.
All API calls by default by priority=0(low) or priorityMin. You can set priority high using priority=1 or using priorityMax.
When an API call is added to queue, The queue gets sorted based on priority and high priority calls are done first followed
by low priority ones.

    Calling Particular Sensor Trending Data:

    	Function: getSensorPointListTrendingData
        (sensorPointId,
        startDate,
        endDate,
        readings,
        priority)
      Parameters: sensorPointID: sensorPointID of sensor
        startDate: string formatted into "YYYY-MM-DDTHH:mm:ss"
        endDate: string formatted into "YYYY-MM-DDTHH:mm:ss"
        readings: number of readings needed
        Priority: number(0 mean low priority and 1 means high priority)
      Returns: response array
      Description: Pushes api calls into queue. The call is based on sensorPointId. Range of 
      data can be provided based on start and end date or number of readings. Priority sets 
      the priority of the call in queue. Use appConstants.priorityMin for lower priority or 
      appConstants.priorityMax for higher priority.

    Get Sensor Data

      Function: getMachineSensorPointList(subMachineId)
      Parameters: subMAchineId: number
      Returns: response array
      Description: Gets submachine sensor data w.r.t. subMachineId.
