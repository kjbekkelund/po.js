(function (root, factory) {

    /*
     * Export magic for node, AMD and the browser.
     */
    if (typeof define === 'function' && define.amd) define(factory);
    else if (typeof exports === 'object') module.exports = factory();
    else root.po = factory();

}(this, function () {

    var slice = Array.prototype.slice;

    var toArray = function (array) {
        return slice.call(array);
    };

    var extend = function (src) {
        var objs = slice.call(arguments, 1);
        for (var i = 0; i < objs.length; i++) {
            for (var key in objs[i]) {
                src[key] = objs[i][key];
            }
        }
        return src;
    };

    var merge = function(args) {
        var argsArray = [{}].concat(toArray(args));
        return extend.apply(null, argsArray);
    };

    return {
        create: function() {
            var attrs = merge(arguments);
            return function ($el) {
                return extend({ $el: $el }, attrs);
            }
        },
        input: function(selector) {
            return function(val) {
                this.$el.find(selector).val(val).change();
                return this;
            }
        },
        button: function(selector) {
            return function() {
                this.$el.find(selector).click();
                return this;
            }
        }
    };

}));
