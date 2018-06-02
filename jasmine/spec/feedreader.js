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
        // Checks if all feeds in allFeeds variable have url and it's not an empty string.
        it('have URL', function() {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        })
        // Checks if all feeds in allFeeds variable have names and they're not empty strings
        it('have name', function() {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        })
    });
    // This suite tests menu functionalities
    describe('The menu', function() {
        // Checks if the menu is hidden by default
        it('is hidden by default', function() {
            expect(document.body).toHaveClass('menu-hidden');
        })
        // Checks if the menu changes visibility on click
        it('changes visibility on click', function() {
            const click = new MouseEvent('click'),
                  menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.dispatchEvent(click);
            expect(document.body).not.toHaveClass('menu-hidden');
            menuIcon.dispatchEvent(click);
            expect(document.body).toHaveClass('menu-hidden');
        });
    });
    // This suite tests the initial entries of our RSS feed
    describe('Initial Entries', function() {

        const feed = document.querySelector('.feed');
        let feedChildren;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedChildren = Array.from(feed.children);
                done();
            });
        });
        // Checks if our initial entries contain at least one entry
        it('contain at least one entry', function(done) {
            expect(feedChildren.length).toBeGreaterThan(0);
            done();
        });
    });
    // This suite tests the functionality of changing feed
    describe('New Feed Selection', function() {

        const feed = document.querySelector('.feed');
        let previousContent,
            currentContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                previousContent = feed.innerHTML;
                loadFeed(1, function() {
                    currentContent = feed.innerHTML;
                    done();
                });
            });
        });
        // Checks if the feed selection actually changes content of the feed
        it('changes content', function(done) {
            expect(currentContent).not.toBe(previousContent);
            done();
        });
    })
}());
