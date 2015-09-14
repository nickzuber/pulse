Pulse.js is a standalone JavaScript function queue that is mainly used to help organize fired events. Functions are loaded into into a Pulse object and dispatched synchronously with an predetermined allotment of time when the dispatch function is called. The queued functions will only be ready to fire once the previous function has successfully ended.

Pulse.js is mainly used for animation queuing, but can easily be adapted to any other synchronous function firing systems.
