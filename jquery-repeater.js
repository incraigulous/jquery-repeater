var Repeater = new Class({
    options: {
        addSelector: '.repeater-add',
        addSelectorOut: false,
        removeSelector: '.repeater-remove',
        withDataAndEvents: false,
        deepWithDataAndEvents: false,
        addCallback: function(){},
        wrapperHtml: "<div class='repeater-wrap'></div>"
    },
    i: 0,
    container: null,
    wrapper: null,

    initialize: function (container, options) {

        $.extend(this.options, options);

        $(container).wrap(this.options.wrapperHtml);
        this.wrapper = $(container).parent();

        this.container = $(container).clone(true, true);
        $(container).remove();
        this.addContainer();

        var $wrap = this.options.addSelectorOut ? $(this.wrapper).closest('form') : $(this.wrapper);

        $wrap.on('click', this.options.addSelector, $.proxy(this.addContainer, this) );

    },

    initContainerButtons: function (container, withRemove) {
        withRemove = typeof withRemove !== 'undefined' ? withRemove : true;

        var self = this;

        if (withRemove) {
            $(container).find(this.options.removeSelector).each(function(index, el) {
                $(el).one("click", function(event) {
                    self.removeContainer(container);
                });
            });
        }
    },

    addContainer: function () {
        var newContainer = $(this.container).clone(this.options.withDataAndEvents, this.options.deepWithDataAndEvents);
        this.incrementContainerAttributes(newContainer);
        this.initContainerButtons(newContainer);
        $(newContainer).appendTo(this.wrapper);
        this.options.addCallback();
        this.i++;
    },

    removeContainer: function (container) {
        $(container).remove();
    },

    incrementContainerAttributes: function (container) {
        var self = this;
        $(container).find("*").each(function(index, el) {
            var id = $(el).attr('id');
            var name = $(el).attr('name');
            if (id) {
                $(el).attr('id', self.getIncrementedId(id));
            }
            if (name) {
                $(el).attr('name', self.getIncrementedName(name));
            }
        });
    },

    getIncrementedId: function (id) {
        return id + '-' + this.i;
    },

    getIncrementedName: function (name) {
        var parts = name.split("[]");
        if (parts.length === 1) {
            //Just your basic name, no array
            return name + '[' + this.i + ']';
        } else if (parts.length === 2) {
            //We have an array
            return parts[0] + '[' + this.i + ']' + parts[1];
        }
        //This is getting too complicated. We'll assume the author knows what they're doing.
        return name;
    }


});