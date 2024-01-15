# [Pulse.js](https://github.com/nickzuber/pulse/)
Pulse.js is a standalone JavaScript function queue object that is mainly used to help organize firing events. Functions are loaded into into a Pulse object and dispatched synchronously with an predetermined allotment of time when the dispatch function is called. The queued functions will only be ready to fire once the previous function has successfully ended.

Pulse.js is mainly used for animation queuing, but can easily be adapted to any other synchronous function firing systems.

## Installation
Simply include the pulse production file on your webpage (preferably all webpages).
```html
<!-- Include pulse.min.js with relative path -->
<script type="text/javascript" src="scripts/pulse.min.js"></script>
```

## Usage
Creating a Pulse object looks something similar to this:
```javascript
var optionalDelay = 1000;
var queue = new Pulse(optionalDelay);
```

When it comes to adding functions to the queue, here is generally how it can be done:
```javascript
var queue = new Pulse();
queue.push(function(){
  console.log('This will be added to the queue.');
});
```

For firing all of the funtions inside the Pulse queue, it's done using the built in dispatch function:
```javascript
queue.dispatch();

// Or if you want a callback function to fire when the queue is emptied

queue.dispatch(function(){
  console.log('All done!');
}, false);

// Or if you want to reverse the order in which the queue fires

queue.dispatch(null, true);
```

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2015 Nick Zuber
