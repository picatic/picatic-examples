# Picatic Slack Slash Command with Rapid API

This project utilizes [Rapid API](https://rapidapi.com) to connect [Picatic](http://developer.picatic.com/) with [Slack](https://api.slack.com). The goal is to allow ticket registration within Slack. Here is an example use case.

1. Listen to [Slack Slash Command](https://api.slack.com/slash-commands) "/p picatic-event-url"
![Slack slash command input](https://preview.ibb.co/hjCbWR/Screenshot_2017_10_13_16_08_28.png)

2. Populate a [Slack Interactive Message](https://api.slack.com/docs/message-buttons) with Picatic event information
![Slack interactive message](https://image.ibb.co/eVVukm/Screenshot_2017_10_13_16_22_55.png)

3. Click the button and get the ticket, in Slack!  
![Tikcet](https://image.ibb.co/jcGvrR/Screenshot_2017_10_13_16_24_07.png)

## Getting Started

This project is using Rapid API to get Slack & Picatic webhook and API calls. Rapid API webhook listener is very easy to set up,especially for local testing. So, in our case, Slack slash command listner can be tested without hosting the project online. Make sure you check out [Rapid API Webhook Doc](https://docs.rapidapi.com/v1.0/docs/getting-started-with-web-hooks)! And for this project, we also need to set up a Slack App. We will go over it step by step here as well.

1. Rapid API Set Up  
a) Sign up a [Rapid API account](https://rapidapi.com/).  
b) Create a [Rapid API App](https://dashboard.rapidapi.com/apps).  
c) Here are all Rapid endpoints we are using in this example: [Slack slashCommand](https://rapidapi.com/package/Slack/functions/slashCommand), [Slack getUserProfile](https://rapidapi.com/package/Slack/functions/getUserProfile), [Slack postMessage](https://rapidapi.com/package/Slack/functions/postMessage), [Picatic Checkout Create](https://rapidapi.com/user/thomas_mirmo/package/Picatic%20Ticketing) & [Picatic Checkout Confirm](https://rapidapi.com/user/thomas_mirmo/package/Picatic%20Ticketing). Make sure you replace all parts of Rapid API & Masheape (partner with Rapid API) in the code with your Rapid API code. Also put in required Slack tokens as well (covered in Slack Set Up below). 

2. Slack Set Up  
a) Create a [Slack APP](https://api.slack.com/apps) and install it to your workplace. Here we need to enable Interactive Components, Slash Commands and Permissions. ![Slack set up](https://preview.ibb.co/kXJpkm/Screenshot_2017_10_16_12_39_20.png)  
b) Set up Slash Commands --> Request URL with the link in [Rapid API Slack slashCommand](https://rapidapi.com/package/Slack/functions/slashCommand).![Slash command set up](https://preview.ibb.co/m9ULQm/Screenshot_2017_10_16_13_02_09.png)  
c) Get your Slack App Token and [Legacy token](https://api.slack.com/custom-integrations/legacy-tokens) and replace it in the code.  
d) Set up Interactive Components --> Request URL with [ngrok](https://ngrok.com/) local hosting (default port is 8080). Alternatively, you can publish your project with [Now](https://zeit.co/now) or whatever publishing tool you are comfortable with.

3. Download dependencies:
```bash
npm install
```

4. Run app in local:
```bash
npm start
```

5. For local testing:
```bash
ngrok http 8080
```

Now, you can test the slash command with Picatic event! (Test event: https://www.picatic.com/slack. You can also try "/p slack"(event_slug) or "/p 132389"(event_id) in the command.)

## App Flow
### Slash command
1. Listen to Slack slash command
2. Get Picatic event by command text
3. Get event tickets
4. Form & post a Slack interactive message  

### Button action
1. Listen to interactive message button action
2. Get Slack user profile
3. Create check out on Picatic
4. Confirm check out
5. DM the slack user with ticket link & Apple wallet endpoint

This code is inspired by an awesome guide from Luciano Mammino: [Create a custom Slack slash command with Node.js and Express](https://scotch.io/tutorials/create-a-custom-slack-slash-command-with-nodejs-and-express)!
