var ERROR = 'error';
var DEBUG = 'debug';

onmessage = (event) => {
    var type = event.data.type;
    var message = event.data.message;
    if (ERROR === type) {
        console.error(message);
    } else if (DEBUG === type) {
        console.log(message);
    }

}