# chrome-extention-sandbox

Here we are playing around and learning how to create a Chrome Extension.

## Goal of the Project

The goal is to learn, how to create a simple Chrome extension. Let's create a
plugin, that can parse predefined HTML page and extract required data from it.
The HTML page should contain a table with the following fields:

- ID
- First Name
- Last Name
- Details(Hyperlink). User can click to see the personal info of the person as
  a popup.

The "Details" popup should contain the following fields:

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
5. Select the [table-parser-extension](table-parser-extension) folder.
6. Once the extension is loaded, you should see the extension icon in your toolbar.
7. Click on the extension icon, and it should open the popup showing the search form.

## Demo

1. Load the extension into Chrome.
2. Open [persons.html](web-pages%2Fpersons.html) in the active tab.
3. Click on the extension in the toolbar.
4. Enter the name, email or phone part to search.
5. Enjoy the results.

## How to debug?

To debug and view `console.log` output in your Chrome extension, you need to
open the correct console related to the extension. Here’s how you can do it:

1. For the popup script (`popup.js`):

    - Open your extension's popup by clicking on the extension icon in the Chrome
      toolbar.
    - Right-click anywhere inside the popup window and choose Inspect
      (or press `Ctrl+Shift+I` or `Cmd+Opt+I` on Mac). This will open the Developer
      Tools for the popup.
    - Go to the Console tab in the Developer Tools to see
      your console.log output.
2. For content script (executeScript) output (e.g., extracted data from the active page):
    - If you're using `chrome.scripting.executeScript` to extract data from the active tab and want to log something
      there, the log will appear in the Console of the Developer Tools of the current tab (not in the popup).
    - To access this:
        - Go to the active tab (the one you’re working on).
        - Right-click on the page and choose Inspect.
        - Go to the Console tab in the Developer Tools to see the logs from the content script.