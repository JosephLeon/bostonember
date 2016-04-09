import Ember from 'ember';
import startApp from 'bostonember/tests/helpers/start-app';

var App;

module('Integration Page - About', {
	beforeEach: function() {
		App = startApp();
	},
	afterEach: function() {
		Ember.run(App, 'destroy');
	}
});

test('Should navigate to the about page', function() {
	visit('/').then(function(assert) {
		click("a:contains('About')").then(function(assert) {
      assert.equal(find('h3').text(), 'About');
    });
	});
});