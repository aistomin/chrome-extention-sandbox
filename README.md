# chrome-extention-sandbox
Here we are playing around and learning how to create a Chrome Extension.

## Goal of Project
The goal is learn, how one creates a Chrome extension. Let's create a simple 
plugin, that can parse predefined HTML page and extract required data from it.
The HTML page should contain a table with the following fields:  
- ID
- First Name
- Last Name
- Details: a link that user can click to see the personal info of the person as
a pop-up.

The details popup should contain the following fields:
- ID
- First Name
- Last Name
- Email
- Phone Number

Let's create a Chrome Extension, that would allow to search records by name
(first + last name), email and phone number.

## How to load the extension into Chrome?
1. Clone the repo. 
2. Open Chrome and navigate to `chrome://extensions/`. 
3. Turn on Developer mode (toggle in the top right). 
4. Click Load unpacked. 
5. Select the [table-parser-extension](table-parser-extension) folder you created. 
6. Once the extension is loaded, you should see the extension icon in your toolbar. 
7. Click on the extension icon, and it should open the popup showing the "Hello World!" message.
