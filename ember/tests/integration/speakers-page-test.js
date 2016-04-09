import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Integration - Speaker Page', {
  beforeEach: function() {
    App = startApp();
    var speakers = [
      {
        id: 1,
        name: 'Bugs Bunny'
      },
      {
        id: 2,
        name: 'Wile E. Coyote'
      },
      {
        id: 3,
        name: 'Yosemite Sam'
      }
    ];

    server = new Pretender(function() {
      this.get('/api/speakers', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({speakers: speakers})];
      });

      this.get('/api/speakers/:id', function(request) {
        var speaker = speakers.find(function(speaker) {
          if (speaker.id === parseInt(request.params.id, 10)) {
            return speaker;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({speaker: speaker})];
      });
    });

  },
  afterEach: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should allow navigation to the speakers page from the landing page', function(assert) {
  visit('/').then(function() {
    click('a:contains("Speakers")').then(function() {
      assert.equal(find('h3').text(), 'Speakers');
    });
  });
});

test('Should list all speakers', function(assert) {
  visit('/speakers').then(function() {
    assert.equal(find('a:contains("Bugs Bunny")').length, 1);
    assert.equal(find('a:contains("Wile E. Coyote")').length, 1);
    assert.equal(find('a:contains("Yosemite Sam")').length, 1);
  });
});

test('Should be able to navigate to a speaker page', function(assert) {
  visit('/speakers').then(function() {
    click('a:contains("Bugs Bunny")').then(function() {
      assert.equal(find('h4').text(), 'Bugs Bunny');
    });
  });
});

test('Should be able visit a speaker page', function(assert) {
  visit('/speakers/1').then(function() {
    assert.equal(find('h4').text(), 'Bugs Bunny');
  });
});