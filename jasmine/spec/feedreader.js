/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URL', function() {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        })

        it('have name', function() {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        })
    });

    describe('The menu', function() {

        it('is hidden by default', function() {
            expect(document.body).toHaveClass('menu-hidden');
        })

        it('changes visibility on click', function() {
            const click = new MouseEvent('click'),
                  menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.dispatchEvent(click);
            expect(document.body).not.toHaveClass('menu-hidden');
            menuIcon.dispatchEvent(click);
            expect(document.body).toHaveClass('menu-hidden');
        });
    });

    describe('Initial Entries', function() {

        const feed = document.querySelector('.feed');
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('contains at least one entry', function(done) {
            expect(feed.children).not.toEqual([]);
            done();
        });
    });

    describe('New Feed Selection', function() {

        const feed = document.querySelector('.feed');
        let previousContent;
        beforeEach(function(done) {
            previousContent = feed.innerHTML;
            loadFeed(1, function() {
                done();
            });
        });

        it('changes content', function(done) {
            expect(feed.innerHTML).not.toBe(previousContent);
            done();
        });
    })
}());
