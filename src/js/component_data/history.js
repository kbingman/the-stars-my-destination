var flight = require('../../../node_modules/flight-umd/flight');

module.exports = flight.component(flightHistory);

function flightHistory() {

    this.attributes({
        routeBase: '',
        routes: null,
    });

    var _routes = [],
        _useHashState = !window.history || !window.history.pushState,
        _counter = 0;

    function parseRoute(route, event) {
        var finishedRoute = route,
            keys = [],
            regex = /:[\w]+[\d\w]*\/?/g,
            matches;

        while ((matches = regex.exec(route)) !== null) {
            var match = matches[0];
            // console.log(match)
            finishedRoute = finishedRoute.replace(match, '([\\w\\s\\d-\.]+)\/?');
            keys.push(match.substr(1, match.length - 2));
        }

        return {
            route: RegExp(finishedRoute + '$'),
            original: route,
            keys: keys,
            event: event
        };
    }

    this.onLoad = function(e) {
        var location = _useHashState? window.location.hash : window.location.pathname;
        var event = _routes.reduce(function(memo, el) {
            var result = el.route.exec(location);

            if (result !== null) {
                for (var i = 0; i < result.slice(1).length; i++) {
                    memo.data[el.keys[i]] = result[i + 1];
                }
                memo.event = el.event;
            }

            return memo;
        }, { data: {} });

        if (event.event) {
          this.trigger(document, event.event, event.data);
        }
    };

    this.onEvent = function(e, data) {
        var location = _useHashState? window.location.hash : window.location.pathname;
        var urlToPush;

        _routes.forEach(function(el) {
            if(e.type == el.event) {
                urlToPush = el.original;
                el.keys.forEach(function(key) {
                    if (data[key] !== undefined) {
                        urlToPush = urlToPush.replace(':' + key, data[key]);
                    }
                });
                if (_useHashState) {
                    window.location.hash = urlToPush;
                } else {
                    if (location !== urlToPush){
                        history.pushState({ path: urlToPush }, '', urlToPush);
                    }
                }
            }
        });
    };

    this.after('initialize', function() {
        console.log(history.state)
        if (history.state !== null) {
          this.on(window, 'popstate', this.onLoad);
        }

        this.on(window, 'hashchange', this.onLoad);

        for (var key in this.attr.routes) {
            this.on(document, this.attr.routes[key], this.onEvent);
            _routes.push(parseRoute(this.attr.routeBase + key, this.attr.routes[key]));
        }

        this.onLoad();
    });
}
