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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a defined non empty URL', function() {
            allFeeds.forEach(function(element) {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a defined non empty name', function() {
            allFeeds.forEach(function(element) {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var body = document.getElementsByTagName('body')[0];

            // test that the required class is included
            expect(body.classList.contains('menu-hidden')).toBe(true);

            var menu = document.querySelector('.slide-menu'),
                transform = window.getComputedStyle(menu, null).transform,
                matrixValues = transform.split(',');

            if (matrixValues.length === 0) {
                new Error('Failed to parse transform content!');
            }

            // test if the element (menu) has the required translation
            expect(parseInt(matrixValues[4])).toBe(-192);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toogle visibility when the icon is clicked', function() {
            var body = document.getElementsByTagName('body')[0],
                icon = document.querySelector('.menu-icon-link');

            // start with the class
            expect(body.classList.contains('menu-hidden')).toBe(true);

            icon.click();
            // the menu should be visible after a click
            expect(body.classList.contains('menu-hidden')).toBe(false);

            icon.click();
            // the menu should be hidden again after the second click
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least one entry', function(done) {
            var feed = document.querySelector('.menu-icon-link');

            // feed as at least one entry
            expect(feed.querySelector('.entry-link')).toBeDefined();
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var feed = document.querySelector('.feed'),
            contentLength = feed.textContent.length;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has actually changed content', function(done) {
            /* we check that the content changed by comparing the length
             * of the text content before and after the change
             */
            expect(feed.textContent.length).not.toBe(contentLength);
            done();
        });
    });

}());
