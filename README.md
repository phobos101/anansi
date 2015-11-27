## Anansi

Anansi crawls eventful to quickly fetch all the events in the UK that match
any given keyword. It then parses the data and saves it to a mongo database.

It is a lightweight back-end API based on the 'HackJammer' project written by
myself, and other WDI students. You can find HackJammer [here].

[here]: https://github.com/webdev11/wdi-project-3

### How to use

Use cURL or Insomnia REST client!

There are two routes:
* /api/events - Grabs all the events in the database
* /api/events/populate - First drops all existing events, then populates events
based on keyword.

Right now the keyword is hardcoded to 'hackathon', change this to whatever you
want in the 'api > controllers >eventController.js' file on line 35.
