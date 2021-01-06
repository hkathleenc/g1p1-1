# g1p1-1
DevMountain Part Time QA Group Project, Group 1

Link to the Jira Epic: Link to the Jira Epic: https://dmutah.atlassian.net/browse/P1G1-1

## Author: Steven Cooper
This document has been prepared to assist in understanding the API calls in the 
Smartlink.postman_collection.json file. This was built in Postman from the Smartlink
website (Hard guess I know, that is why I let you know now) and should be used with 
the latest version of Postman. You will need to also import the environment, 
Smartlink.postman_environment.json file.

## Login
### POST
Authenticates supplied username and password with the backend and provides 
cookie in response to authenticate all other calls within the session until 
the logout API is called.

The username and password should already be setup to use for the test account. If 
you want to change it, you can update the username and password variables in the 
environment settings. These get added to the body of the API call which is passed as 
"x-www-form-urlencoded" data type. 

When you call this API, you will see that the response body returned is an HTML 
document. This is expected since this will rediret us to the main page under normal 
circumstances. The data we are worried about here will be found in the response Cookie 
with the name "PHPSESSID". It should return a key 25 characters in length. Postman 
should automatically use this cookie to authenticate future calls to this endpoint.

## Get Panel Status
### GET
Calls the backend and asks for the Alarm Panel or "Gateways" status.

The data we are looking for in this API call will be in the Response body in the JSON 
format. The important information will be under "payload". You can see all of the data 
in regards to the panel here, but what we are really focused on is the "arming_level" 
value.

There is a test in this API call which serves us by updating our environment variable 
"armingLevel" with the "arming_level" value from the JSON response. We will use this 
in our next two API calls

## Arm Away from Current Arming Level
### POST
Calls the backend to send an arming command to the alarm panel.

This API, similar to the "Login" API, uses "x-www-form-urlencoded" data in its body for 
instructions. It is already set up to send the "Arm Away" command just like clicking 
the button on the website. Another required field/data value here is the "panel_status" 
which is the panels current "arming_level" value. You will want to run the "Get Panel Status" 
API first so that this variable is updated in your environment.

After you call this API, call the "Get Panel Status" API afterwards and note that the "arming_level" 
value will change. You will see that is says something like "exit_delay". This is normal. 
Wait up to 60 seconds before calling the "Get Panel Status" API again, and you should see 
that the "arming_level" value has changed to something like "armed_stay" or "armed_away".

## Disarm from Current Arming Level
### POST 
Calls the backend to send a disarm command to the alarm panel.

This API, similar to the "Arm Away from Current Arming Level" API, will require you to 
first call the "Get Panel Status" API to make sure you have the latest Data and are in 
and Armed state to be able to Disarm from. After you call this API, call the "Get Panel Status:
API again, and see that the "arming_level" value has changed to "disarmed".