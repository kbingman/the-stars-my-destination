var expect = require('chai').expect;
var Router = require('../../../src/js/component_data/history');
var intitialRoute = document.location.pathname;

describe('component_data/history', function(){

  /**
   * Tests if the 'debug' route, which matches the URL has been called.
   * This must come first, which is bit stupid, but does test if the
   * event corresponding to the route is called.
   */
  describe('Loading events', function(){

    beforeEach(function() {
      var routes = {};
      routes[intitialRoute] ='testDebug';

      spy = sinon.spy();
      $(document).on('testDebug', spy);

      this.component = (new Router()).initialize(document, {
        routes: routes
      });
    });

    afterEach(function(){
      this.component.teardown();
    });

    it('should fire the testDebug event on load', function() {
      expect(spy.called).to.equal(true);
    });

  });

  describe('URL change', function(){

    beforeEach(function() {
      this.component = (new Router()).initialize(document, {
        routes: {
          '/': 'uiIndex',
          '/sector/:x/:y/': 'uiSector',
          '/debug.html': 'testDebug'
        }
      });
    });

    afterEach(function(){
      history.replaceState({ test: 'end' }, '', intitialRoute);
      this.component.teardown();
    });

    it('should set the URL to </> on <uiSystem>', function() {
      this.component.trigger('uiIndex');
      expect(document.location.pathname).to.equal('/');
    });

    it('should set the URL to </sector/1/2> on <uiSector>', function() {
      this.component.trigger('uiSector', {
        x: 1,
        y: 2
      });
      expect(document.location.pathname).to.equal('/sector/1/2/');
    });

    it('should set the URL to </debug.html> on <testDebug>', function() {
      this.component.trigger('testDebug');
      expect(document.location.pathname).to.equal('/debug.html');
    });

  });

  describe('Popstate events', function(){

    beforeEach(function() {
      spy = sinon.spy();
      this.component = (new Router()).initialize(document, {
        routes: {
          '/': 'uiIndex',
          '/sector/:x/:y': 'uiSector'
        }
      });
    });

    afterEach(function(){
      history.replaceState({ test: 'end' }, '', intitialRoute);
      this.component.teardown();
    });

    describe('An index route', function(){
      it('should trigger uiIndex', function() {
        this.component.on('uiIndex', spy);

        history.replaceState({ test: 'index' }, '', '/');
        $(window).trigger('popstate');

        expect(spy.called).to.equal(true);
      });
    });

    describe('A route with params', function(){
      beforeEach(function(){
        this.component.on('uiSector', spy);
        history.replaceState({ test: 'sector' }, '', '/sector/1/2/');
        $(window).trigger('popstate');
      });

      it('should trigger uiSector', function() {
        expect(spy.called).to.equal(true);
      });

      it('should set the <x> param', function() {
        expect(spy.args[0][1].x).to.equal('1');
      });

      it('should set the <y> param', function() {
        expect(spy.args[0][1].y).to.equal('2');
      });
    });

  });

});
