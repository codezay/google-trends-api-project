call npm install

if you don't have nodemon installed, please install it locally or globaly i installed it globaly
-----------------------------------
npm install -g nodemon
-----------------------------------

after that call the below in the terminal
-----------------------------------
nodemon server
-----------------------------------

if you don't wish to use nodemon then you could start the project using node command itself.
-----------------------------------
node index
-----------------------------------


this should start the app

the port for runing the app is defined in the .env file

this will be the url the app is runing on
http://localhost:8081/api/v2/trends/

url for all countries
http://localhost:8081/api/v2/trends/trend-term/donald duck

url for countries then states
http://localhost:8081/api/v2/trends/trend-term/countries-then-states/donald duck

url for countries and states
http://localhost:8081/api/v2/trends/trend-term/countries-and-states/donald duck



The limiter is set to ten seconds, it can take a long time to loop through all the given codes. the limiter is set in milliseconds.
You could set the minTime to any value you want or you could nto even use the limiter.
This is found the "trends.controller.js" file
-----------------------------------
const limiter = new Bottleneck({
  maxConcurrent: 1, //calls allowed per minTime
  minTime: 10000, // ten seconds
});
-----------------------------------


The values that are needed to loop throught the api call are inside the helpers folder in the "stored-values.js" file.

To tell the app what values it need to loop through comment or uncomment the variable assignment in the trends.controller.js
which can be found in the controller folder.

all the values of countries and states are stored in the "stored-values.js" file which can be found inside the helpers folder.


Since this project is using ES6 modules 'require' dosent work nativily.
If you want to use 'require' declare the below code on the top of the file, where you want to use 'require'.
------------------------------------------------
import { createRequire } from "module";
const require = createRequire(import.meta.url);
------------------------------------------------



