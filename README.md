
# Project Details
Mock
By: Lina Halim (lhalim) and Maria Chavezz (mchavezz)
Time spent on project: 8 hours each (16 total)
Include the total estimated time it took to complete project
(https://github.com/cs0320-s24/mock-mchavezz-lhalim.git)

# Design Choices

- Login/Logout button: a high contrast button is constantly available to log in and out of the website
- Login logic: To login, the user must input a username and a password, the password must be 8+ characters and include a number and a special character (implemented using a regex), higher security can be implemented later
- Login password: the password characters show as round dots for increased security
- Top section: a top section with a logo, a phone number and an address appear at the top section and are constantly visible to be available to the user
- Bottom section: a bottom section including information about the client and contact links (email and facetime)
- Font sizes: text sizes consider accessibility and priority of the information
- Colours: high constrast was chosen between the colors to enhance accessibility
- Toggle Verbose/Brief: for accessibility, the mode is a toggle that can be checked by the user that shows the current mode, brief is the default mode
- Current Dataset display: as only one dataset can be loaded at a time, the current dataset name is displayed
- Unload CSV button: after a CSV is loaded, not only can the user use the unload_csv command, a button also appears

# Errors/Bugs

 Write reproduction steps for all the bugs in your program. If the mentor TA finds an error and knows how to reproduce it, they will be able to leave better feedback. If the mentor TA finds the bug without proper documentation, they will assume you did not test your program properly.
Explanations for checkstyle errors (hopefully none)

# Tests

Explain the testing suites that you implemented for your program and how each test ensures that a part of the program works. 

# How to

In order to run our web app, you should:

- run <npm start> on the terminal
- open the link with the local host
- log in to the website to see the input command bar
- use load_csv, unload_csv, view in the command bar

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
In order to work on this project, we have used many online resources:

information about accessibility in html:
https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML
https://www.programiz.com/html/accessibility
passwords and html:
https://www.dofactory.com/html/input/password
view csv html formatting documentation:
https://www.w3schools.com/html/html_tables.asp
inspo for visuals of the website:
http://scottirealtyri.com/index.php/page/appraisals
