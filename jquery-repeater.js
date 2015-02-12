var Repeater = new Class({
    options: {
        addSelector: '.repeater-add',
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
        jQuery.extend(true, {}, this.options, options);

        jQuery(container).wrap(this.options.wrapperHtml);
        this.wrapper = jQuery(container).parent();

        this.container = jQuery(container).clone(true, true);
        jQuery(container).remove();
        this.addContainer();

        this.initContainerButtons(this.container);
    },

    initContainerButtons: function (container, withRemove) {
        withRemove = typeof withRemove !== 'undefined' ? withRemove : true;

        var self = this;
        jQuery(container).find(this.options.addSelector).each(function(index, el) {
            jQuery(el).on("click", function(event) {
                self.addContainer();
            });
        });

        if (withRemove) {
            jQuery(container).find(this.options.removeSelector).each(function(index, el) {
                jQuery(el).on("click", function(event) {
                    self.removeContainer(container);
                });
            });
        }
    },

    addContainer: function () {
        this.i++;
        var newContainer = jQuery(this.container).clone(this.options.withDataAndEvents, this.options.deepWithDataAndEvents);
        this.incrementContainerAttributes(newContainer);
        this.initContainerButtons(newContainer);
        jQuery(newContainer).appendTo(this.wrapper);
        this.options.addCallback();
    },

    removeContainer: function (container) {
        jQuery(container).remove();
    },

    incrementContainerAttributes: function (container) {
        var self = this;
        jQuery(container).find("*").each(function(index, el) {
            var id = jQuery(el).attr('id');
            var name = jQuery(el).attr('name');
            if (id) {
                jQuery(el).attr('id', self.getIncrementedId(id));
            }
            if (name) {
                jQuery(el).attr('name', self.getIncrementedName(name));
            }
        });
    },

    getIncrementedId: function (id) {
        return id + '-' + this.i;
    },

    getIncrementedName: function (name) {
        parts = name.split("[]");
        if (parts.length === 1) {
            //Just your basic name, no array
            return name + '_' + this.i;
        } else if (parts.length === 2) {
            //We have an array
            return parts[0] + '[' + this.i + ']' + parts[1];
        }
        //This is getting too complicated. We'll assume the author knows what they're doing.
        return name;
    }


});