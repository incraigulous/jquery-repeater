# jquery-repeater
jQuery repeating fields. Includes the ability to add and remove fields and keeps up with ID and name incrementing. Easy Peasy. Requires [class.js](https://classjs.readthedocs.org/en/latest/) which is included in the bower_components folder if you're not using Bower.

##How to use it
Instantiate a new Repeater class and pass in your element. You can also pass an options object as your second parameter but this is optional.

````javascript
//All options are optional.
    new Repeater($('.repeatable'), {
        addSelector: '.repeater-add', //The css selector for the add button.
        removeSelector: '.repeater-remove', //The css selector for the remove button.
        withDataAndEvents: false, //Should data and events on repeatable sections be cloned?
        deepWithDataAndEvents: false, //Should data and events of repeatable sections descendants be cloned?
        addCallback: function(){}, //A callback function that generated repeatable sections will be passed into.
        wrapperHtml: "<div class='repeater-wrap'></div>" //HTML for an element to wrap all repeatable sections in.
    });
````