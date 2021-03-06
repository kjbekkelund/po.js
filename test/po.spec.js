describe('po', function() {

    var expect = chai.expect;

    it('returns a function from #create', function() {
        var pageObject = po.create();
        expect(typeof pageObject).to.equal('function');
    });

    it('contains injected methods when invoked', function() {
        var pageObject = po.create({
            test: function() {
                return 'test';
            }
        })();

        expect(pageObject.test()).to.equal('test');
    });

    it('contains injected $el when invoked', function() {
        var $el = $('<div></div>');
        var pageObject = po.create()($el);
        expect(pageObject.$el).to.equal($el);
    });

    it('has a $ helper to find inside $el', function() {
        var $el = $('<div><h1>heading</h1></div>');
        var pageObject = po.create({
            header: function() {
                return this.$('h1').text();
            }
        })($el);

        expect(pageObject.header()).to.equal('heading');
    });

    describe('input fields', function() {
        it('has an input helper which fills in input value', function() {
            var $el = $('<div><input class="author" type="text" value=""></div>');

            var pageObject = po.create({
                author: po.input('.author')
            })($el);

            expect($el.find('.author').val()).to.equal('');

            pageObject.author('kim');

            expect($el.find('.author').val()).to.equal('kim');
        });

        it('provides the input value', function() {
            var $el = $('<div><input class="author" type="text" value="tim"></div>');

            var pageObject = po.create({
                author: po.input('.author')
            })($el);

            expect(pageObject.author()).to.equal('tim');
        });
    });

    it('has button helper which clicks button when invoked', function(done) {
        var $el = $('<div><input class="submit" type="submit"></div>');

        var pageObject = po.create({
            submit: po.button('.submit')
        })($el);

        $el.find('.submit').click(function() {
            done();
        });

        pageObject.submit();
    });

});
