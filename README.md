## Anansi

Anansi crawls eventful to quickly fetch all the events in the UK that match
any given keyword. It then parses the data and saves it to a mongo database.

It is a lightweight back-end API based on the 'HackJammer' project written by
myself, and other WDI students. You can find HackJammer [here].

[here]: https://github.com/webdev11/wdi-project-3

### How to use

Use cURL or Insomnia REST client!

There are two routes:
* GET /api/events - Grabs all the events in the database
* POST /api/events/populate - First drops all existing events, then populates events
based on keyword.

The keyword is grabbed from a front end 'keyword' paramater, so on your front end JS file, add something like:

```javascript
var keyword = $('#keyword-entry').val();

$.ajax({
method: 'POST',
url: 'http://localhost:3000/api/events/populate',
data: { keyword }
}).done(function (data) {
console.log('DONE!');
listEvents();
});
```

## Front end Demo

[Click here!]

[Click here!]: https://github.com/phobos101/anansi-front
