vkNgine JavaScript Library v1.0.0
==============================================  

This is my Javascript library that I have worked on almost 1.5-2 years ago
  
I didn't create any documentation for it, but you can understand how to use it if you look through the code.
  
## Example Usage ##

To properly see these examples, download this file. As you know github removes the html and other javascript related codes etc.etc.

#### $() function ####

replaces document.getElementById()

<div id="foobar">barbar foo</div>

var element = $('foobar');
alert(element.innerHTML);

#### $t() function ####

replaces document.getElementsByTagName()

<form name="foo"><input name="bar0" /><input name="bar1" /><input name="bar2" /></form>

var elements = $t('input');
$alert_r(elements);

#### $f() function ####

to select a form or an element in a form

<form name="foo"><input name="bar0" /><input name="bar1" /><input name="bar2" /></form>

var element = $f('foo');
alert(element);
var element = $f('foo','bar0');
alert(element);

#### $ajax() function ####

to create or to cancel ajax calls/requests

function showError(e){ alert('error ' + e); }
function showResult(e){ alert(e.responseText); }

var requests = {}
/* make ajax request:

requests.ajax1 = new $ajax({
url: '',
method: '',
parameters: '',
onComplete: [function],
onError: [function]
});*/
requests.ajax1 = new $ajax({
url: 'document.php',
method: 'GET',
parameters: 'foo=hello world',
onComplete: showResult,
onError: showError
});

// call the request
requests.ajax1.call();
// cancel the request: 
requests.ajax1.abort();

#### $q() function ####

getting the wanted querystring from the url

// [variable] = new $q('[variable]');
var querystring = new $q('foo');
// [variable].value;
alert(querystring.value);

#### $try() function ####

say you have two functions, one of these works under mozilla and other one works under IE, with this try function if one of these function works you, the desirable value will be passed

function target(event) {
  var target = $try( /* which html element on mouse now? */
  function(){ return window.event.srcElement; },
  function(){ return event.target; }
);
alert(target);
}

$('foobar').onclick = target

#### $alert_r() function ####

do you know php? do you know print_r? i say no more!

var array = [1,5,10,15,13,11,9,7,5,3,1];
$alert_r(array);

#### $sort() function ####

sorts the supplied numeric array in ascending order

var array = [1,5,10,15,13,11,9,7,5,3,1];
$alert_r($sort(array));

#### $event() function ####

crate and kill events

var events = {};

// create new event: events.click1 = new $event(object,event,function);
events.click1 = new $event(document,'click',function(){ alert('click1 event created'); });

// kill the event: events.click1.kill();
setTimeout(function(){ events.click1.kill(); alert('click1 event killed'); }, 5000);

#### $style() function ####

to retrieve an elements css properties and edit it

you have this css:
[id]foo { width:100px; height:100px; background-color:black; }

this is the element
<div id="foo"></div>

var styles = {};

// create new style: styles.foo = new $style(object);
styles.foo = new $style($('foo'));
// call its css stylesheet: styles.foo.get();
$alert_r(styles.foo.get);

// call its properties: styles.foo.get.[property name]
alert(styles.foo.get.width);

//edit css foo.set({
    property: 'value',
    property: 'value'
});
  
styles.foo.set({
    width: '200px',
    backgroundColor: 'red'
});

#### $mouse() function ####

it will show you the coordinates of the mouse pointers' location, also which html element it's on

<div id="foobar">click me!</div>
<script>
function mouseInfo(event) {
  alert('mouse pointer's x/y coordinates are: ' + $mouse(event).x + 'x' + $mouse(event).y);
  alert('mouse pointer is on : ' + $mouse(event).t);
}
$('foobar').onclick = mouseInfo

