"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define("ticket-system/adapters/application", ["exports", "ember-data"], function (exports, _emberData) {
    exports["default"] = _emberData["default"].RESTAdapter.extend({
        namespace: "api",
        headers: {
            "Accept": "application/json"
        },
        authorizer: 'authorizer:token'
    });
});
define('ticket-system/adapters/issue', ['exports', 'ticket-system/adapters/application'], function (exports, _ticketSystemAdaptersApplication) {
  exports['default'] = _ticketSystemAdaptersApplication['default'].extend({});
});
define('ticket-system/adapters/project', ['exports', 'ticket-system/adapters/application'], function (exports, _ticketSystemAdaptersApplication) {
  exports['default'] = _ticketSystemAdaptersApplication['default'].extend({});
});
define('ticket-system/app', ['exports', 'ember', 'ticket-system/resolver', 'ember-load-initializers', 'ticket-system/config/environment'], function (exports, _ember, _ticketSystemResolver, _emberLoadInitializers, _ticketSystemConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _ticketSystemConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ticketSystemConfigEnvironment['default'].podModulePrefix,
    Resolver: _ticketSystemResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _ticketSystemConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ticket-system/authenticators/token', ['exports', 'ember-simple-auth-token/authenticators/token'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken) {
  exports['default'] = _emberSimpleAuthTokenAuthenticatorsToken['default'].extend({
    serverTokenEndpoint: 'https://ticketing-system-abdullah2891.c9users.io/token/'
  });
});
// app/authenticators/devise.js
define('ticket-system/authorizers/token', ['exports', 'ember-simple-auth-token/authorizers/token'], function (exports, _emberSimpleAuthTokenAuthorizersToken) {
  exports['default'] = _emberSimpleAuthTokenAuthorizersToken['default'].extend({});
});
// app/authorizers/devise.js
define('ticket-system/components/dashboard-view', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			setProject: function setProject(project) {
				if (project.get('issues')) {
					this.set('selected_issues', project.get('issues'));
				}
			}
		}
	});
});
define('ticket-system/components/issue-card', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        store: _ember['default'].inject.service(),
        issues: function issues() {
            var issue = this.get('store').findAll('issue');
            console.log(issue);
            return issue;
        },
        actions: {
            updateIssue: function updateIssue(id) {
                var store = this.get('store');
                // linked list to change status
                var statusChange = {
                    "open": "working",
                    "working": "closed",
                    "closed": "open"
                };

                store.find('issue', id).then(function (issue) {
                    var status = issue.get('status');
                    console.log(status);
                    issue.set('status', statusChange[status]);
                    issue.save().then(function (response) {
                        console.log(response);
                    });
                });

                console.log("clicked", id);
            },
            deleteIssue: function deleteIssue(id) {
                var store = this.get('store');
                console.log("delete clcked");
                store.find('issue', id).then(function (issue) {
                    issue.destroyRecord();
                });
            }
        }
    });
});
define('ticket-system/components/issue-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('ticket-system/components/my-modal', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    show: (function () {
      this.$('.modal').modal();
    }).on('didInsertElement')
  });
});
define('ticket-system/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        hideModal: false,
        actions: {
            showModal: function showModal() {
                this.toggleProperty('hideModal');
            }
        }
    });
});
define('ticket-system/components/project-component', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({

        actions: {
            jumpToIssue: function jumpToIssue() {
                console.log("clicking");
                var router = this.get('router');
                console.log(router);
                router.transitionToRoute('issues');
            }
        }
    });
});
define('ticket-system/components/project-list', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			setProject: function setProject(project) {
				this.sendAction('setProject', project);
			}

		}
	});
});
define('ticket-system/components/show-alert', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({

        show: (function () {
            this.$('.modal').modal();
        }).on('didInsertElement'),
        actions: {
            submit: function submit() {
                console.log("buubling up");
                this.$('.modal').modal('hide');
            }
        }

    });
});
define('ticket-system/components/submit-issue', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        showForm: false,
        store: _ember['default'].inject.service(),
        IssueTitle: '',
        submitStatus: false,
        actions: {
            submit: function submit() {
                console.log("submitting");
                var store = this.get('store');

                var IssueTitle = this.get('IssueTitle'),
                    IssueDescription = this.get('IssueDescription'),
                    IssueOwner = this.get('IssueOwner');

                if (!(IssueTitle && IssueDescription && IssueOwner)) {
                    console.log("Failed to submit");
                    return;
                }

                // console.log("store ",store);
                var issue = store.createRecord('issue', {
                    "title": IssueTitle,
                    "description": IssueDescription,
                    "owner": IssueOwner,
                    "status": "open" //new issues are always should be open
                });

                issue.save().then((function (response) {
                    console.log(response);
                    this.sendAction('submit');
                }).bind(this));
            },
            submit_issue: function submit_issue() {
                console.log("showForm");
                this.toggleProperty('showForm');
            }
        }
    });
});
define('ticket-system/helpers/app-version', ['exports', 'ember', 'ticket-system/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _ticketSystemConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _ticketSystemConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ticket-system/helpers/compare-string', ['exports', 'ember'], function (exports, _ember) {
    exports.compareString = compareString;

    function compareString(params /*, hash*/) {
        if (params.length === 3) {
            return params[0] !== params[1];
        }
        return params[0] === params[1];
    }

    exports['default'] = _ember['default'].Helper.helper(compareString);
});
define('ticket-system/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ticket-system/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ticket-system/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ticket-system/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ticketSystemConfigEnvironment) {
  var _config$APP = _ticketSystemConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ticket-system/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ticket-system/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ticket-system/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ticket-system/initializers/ember-simple-auth', ['exports', 'ticket-system/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ticketSystemConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _ticketSystemConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _ticketSystemConfigEnvironment['default'].rootURL || _ticketSystemConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('ticket-system/initializers/export-application-global', ['exports', 'ember', 'ticket-system/config/environment'], function (exports, _ember, _ticketSystemConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_ticketSystemConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _ticketSystemConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_ticketSystemConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ticket-system/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ticket-system/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt', 'ember-simple-auth-token/authorizers/token', 'ember-simple-auth-token/configuration', 'ticket-system/config/environment'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken, _emberSimpleAuthTokenAuthenticatorsJwt, _emberSimpleAuthTokenAuthorizersToken, _emberSimpleAuthTokenConfiguration, _ticketSystemConfigEnvironment) {

  /**
    Ember Simple Auth Token's Initializer.
    By default load both the Token and JWT (with refresh) Authenticators.
  */
  exports['default'] = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      _emberSimpleAuthTokenConfiguration['default'].load(container, _ticketSystemConfigEnvironment['default']['ember-simple-auth-token'] || {});
      container.register('authorizer:token', _emberSimpleAuthTokenAuthorizersToken['default']);
      container.register('authenticator:token', _emberSimpleAuthTokenAuthenticatorsToken['default']);
      container.register('authenticator:jwt', _emberSimpleAuthTokenAuthenticatorsJwt['default']);
    }
  };
});
define('ticket-system/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ticket-system/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ticket-system/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _emberDataInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInitializeStoreService["default"]
  };
});
define('ticket-system/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('ticket-system/models/issue', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        description: _emberData['default'].attr(),
        owner: _emberData['default'].attr(),
        status: _emberData['default'].attr(),
        title: _emberData['default'].attr(),
        projects: _emberData['default'].belongsTo('project')
    });
});
define('ticket-system/models/project', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		date_created: _emberData['default'].attr('string'),
		date_modified: _emberData['default'].attr('string'),
		owner: _emberData['default'].attr('string'),
		projects: _emberData['default'].attr('string'),

		issues: _emberData['default'].hasMany('issue')
	});
});
define('ticket-system/models/test', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		test: _emberData['default'].attr()
	});
});
define('ticket-system/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ticket-system/router', ['exports', 'ember', 'ticket-system/config/environment'], function (exports, _ember, _ticketSystemConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ticketSystemConfigEnvironment['default'].locationType,
    rootURL: _ticketSystemConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('issues');
    this.route('projects');
    this.route('login');
  });

  exports['default'] = Router;
});
define('ticket-system/routes/application', ['exports', 'ember'], function (exports, _ember) {
  var Route = _ember['default'].Route;

  // Ensure the application route exists for ember-simple-auth's `setup-session-restoration` initializer
  exports['default'] = Route.extend();
});
define('ticket-system/routes/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        beforeModel: function beforeModel() {
            this.replaceWith('issues');
        }
    });
});
define('ticket-system/routes/issues', ['exports', 'ember'], function (exports, _ember) {
	var RSVP = _ember['default'].RSVP;
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return RSVP.hash({
				projects: this.get('store').findAll('project', { reload: true }),
				issues: this.get('store').findAll('issue', { reload: true })
			});
		}

	});
});
define('ticket-system/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ticket-system/routes/projects', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
        model: function model() {
            var project = this.get('store').findAll('project');
            return project;
        }
    });
});
define('ticket-system/routes/submit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ticket-system/routes/test', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("ticket-system/serializers/application", ["exports", "ember-data"], function (exports, _emberData) {
    exports["default"] = _emberData["default"].RESTSerializer.extend({
        serialize: function serialize(snapshot, options) {
            var json = this._super.apply(this, arguments);
            console.log(" updating and put serialize ");
            console.log(json);

            return json.data.attributes;
        }

    });
});
define('ticket-system/serializers/issue', ['exports', 'ticket-system/serializers/application'], function (exports, _ticketSystemSerializersApplication) {
	exports['default'] = _ticketSystemSerializersApplication['default'].extend({
		normalizeResponse: function normalizeResponse(store, primaryModelClass, payload, id, requestType) {
			var modified_payload = {
				'issue': payload
			};
			console.log(modified_payload);
			return this._super(store, primaryModelClass, modified_payload, id, requestType);
		}
	});
});
define('ticket-system/serializers/project', ['exports', 'ticket-system/serializers/application'], function (exports, _ticketSystemSerializersApplication) {
	exports['default'] = _ticketSystemSerializersApplication['default'].extend({
		normalizeResponse: function normalizeResponse(store, primaryModelClass, payload, id, requestType) {
			var modified_payload = {
				'project': payload
			};
			console.log(modified_payload);
			return this._super(store, primaryModelClass, modified_payload, id, requestType);
		}
	});
});
define('ticket-system/serializers/test', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTSerializer.extend({
		normalize: function normalize(model, hash, prop) {
			console.log(hash);
			console.log(prop);
			return this._super.apply(this, arguments);
		},

		pushPayload: function pushPayload(store, payload) {
			console.log(payload);
			console.log('++++store+++++');
			console.log(store);
			var modifiedPayload = [];

			modifiedPayload.push(payload.test);
			modifiedPayload.push(payload.test.cnl);

			return this._super(store, { test: modifiedPayload });
		}

	});
});
define('ticket-system/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('ticket-system/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _emberCookiesServicesCookies) {
  exports['default'] = _emberCookiesServicesCookies['default'];
});
define('ticket-system/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('ticket-system/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ticket-system/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "psK0Ernf", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/application.hbs" } });
});
define("ticket-system/templates/components/dashboard-view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "WD8hHglD", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-3\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"project-list\"],null,[[\"projects\",\"setProject\"],[[\"get\",[\"model\",\"projects\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"setProject\"],null]]]],false],[\"text\",\"\\t\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-9\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"append\",[\"helper\",[\"issue-list\"],null,[[\"issues\"],[[\"get\",[\"selected_issues\"]]]]],false],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/dashboard-view.hbs" } });
});
define("ticket-system/templates/components/issue-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "634hTBfL", "block": "{\"statements\":[[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group issue\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"post\",\"title\"]],false],[\"text\",\"\\n\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-ok-sign update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"updateIssue\",[\"get\",[\"post\",\"id\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-remove-sign update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteIssue\",[\"get\",[\"post\",\"id\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"        \\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"compare_string\"],[[\"get\",[\"post\",\"status\"]],\"closed\",\"not_equal\"],null]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n    \\n    \\n    \\n\\n    \\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"post\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"post\",\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/issue-card.hbs" } });
});
define("ticket-system/templates/components/issue-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gwhcqA8P", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"dashboard row\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 column\"],[\"flush-element\"],[\"text\",\"\\n            \\n            \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"issues\"]]],null,5],[\"text\",\"    \\n            \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 column\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"issues\"]]],null,3],[\"text\",\"            \\n        \"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-sm-4 column\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"issues\"]]],null,1],[\"text\",\"            \\n        \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"                            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"text\",\"\\n                                \"],[\"append\",[\"helper\",[\"issue-card\"],null,[[\"post\"],[[\"get\",[\"post\"]]]]],false],[\"text\",\"\\n                            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"helper\",[\"compare-string\"],[[\"get\",[\"post\",\"status\"]],\"closed\"],null]],null,0],[\"text\",\"                \\n\"]],\"locals\":[\"post\"]},{\"statements\":[[\"text\",\"                            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"text\",\"\\n                                \"],[\"append\",[\"helper\",[\"issue-card\"],null,[[\"post\"],[[\"get\",[\"post\"]]]]],false],[\"text\",\"\\n                            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"helper\",[\"compare-string\"],[[\"get\",[\"post\",\"status\"]],\"working\"],null]],null,2],[\"text\",\"                \\n\"]],\"locals\":[\"post\"]},{\"statements\":[[\"text\",\"                            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"text\",\"\\n                                \"],[\"append\",[\"helper\",[\"issue-card\"],null,[[\"post\"],[[\"get\",[\"post\"]]]]],false],[\"text\",\"\\n                            \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"                        \\n\"],[\"block\",[\"if\"],[[\"helper\",[\"compare-string\"],[[\"get\",[\"post\",\"status\"]],\"open\"],null]],null,4],[\"text\",\"                \\n\"]],\"locals\":[\"post\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/issue-list.hbs" } });
});
define("ticket-system/templates/components/my-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "al11RglF", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal fade\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-dialog\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"close\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"×\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"modal-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"title\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-body\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"yield\",\"default\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-footer\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"flush-element\"],[\"text\",\"Close\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"ok\"]],[\"flush-element\"],[\"text\",\"OK\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/my-modal.hbs" } });
});
define("ticket-system/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HWIEj2zq", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"showModal\"]],[\"flush-element\"],[\"text\",\"Submit Issue\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"hideModal\"]]],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"unknown\",[\"show-alert\"]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/nav-bar.hbs" } });
});
define("ticket-system/templates/components/project-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HGaBWEFK", "block": "{\"statements\":[[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"name\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-menu-right update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"jumpToIssue\",[\"get\",[\"project_id\"]]]],[\"flush-element\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/project-component.hbs" } });
});
define("ticket-system/templates/components/project-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Vba+6X0I", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"projects\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"append\",[\"helper\",[\"log\"],[[\"get\",[\"project\",\"issues\",\"length\"]]],null],false],[\"text\",\"\\n\\t  \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"setProject\",[\"get\",[\"project\"]]]],[\"flush-element\"],[\"append\",[\"unknown\",[\"project\",\"projects\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/project-list.hbs" } });
});
define("ticket-system/templates/components/show-alert", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "c6Id1CSV", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal fade\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-dialog\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"close\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"×\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"modal-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"title\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-body\"],[\"flush-element\"],[\"text\",\"\\n       \"],[\"append\",[\"helper\",[\"submit-issue\"],null,[[\"issue\",\"post\",\"submit\"],[[\"get\",[\"issue\"]],[\"get\",[\"pos\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"submit\"],null]]]],false],[\"text\",\"       \\n      \"],[\"close-element\"],[\"text\",\"\\n      \\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/show-alert.hbs" } });
});
define("ticket-system/templates/components/submit-issue", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zG8IhAq7", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"submit-form\"],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"showForm\"]],\"show-form\"],null]]]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"form\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n        \\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\"],[[\"get\",[\"IssueTitle\"]],\"Issue title\"]]],false],[\"text\",\"\\n    \\n      \"],[\"close-element\"],[\"text\",\"\\n      \\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n      \\n        \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Owner\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placeholder\"],[[\"get\",[\"IssueOwner\"]],\"Issue Description\"]]],false],[\"text\",\"\\n      \\n      \"],[\"close-element\"],[\"text\",\"\\n    \\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n    \\n        \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\",\"placeholder\"],[\"form-control\",[\"get\",[\"IssueDescription\"]],\"Owner\"]]],false],[\"text\",\"\\n    \\n      \"],[\"close-element\"],[\"text\",\"\\n    \\n    \\n    \\n    \\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n    \\n    \\n    \\n    \"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/submit-issue.hbs" } });
});
define("ticket-system/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EBH7cuco", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/index.hbs" } });
});
define("ticket-system/templates/issues", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2H2trTCK", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid \"],[\"flush-element\"],[\"text\",\"\\n    \\n    \"],[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n   \\n    \"],[\"append\",[\"helper\",[\"dashboard-view\"],null,[[\"model\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\" \\n       \\n\\n\"],[\"text\",\"    \\n    \\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"log\"],[\"model\",[\"get\",[\"model\"]]],null],false],[\"text\",\"\\n\\n\"],[\"text\",\"\\n    \\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/issues.hbs" } });
});
define("ticket-system/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "q4v7LBs3", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"login-page\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/login.hbs" } });
});
define("ticket-system/templates/projects", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Bj5cqgur", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \\n                \"],[\"append\",[\"helper\",[\"log\"],[[\"get\",[\"project\"]]],null],false],[\"text\",\"\\n                \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"text\",\"\\n                    \"],[\"append\",[\"helper\",[\"project-component\"],null,[[\"name\",\"project_id\"],[[\"get\",[\"project\",\"Project\"]],[\"get\",[\"project\",\"id\"]]]]],false],[\"text\",\"\\n                \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/projects.hbs" } });
});
define("ticket-system/templates/submit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wJsv89VT", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"dashboard row\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"submit-issue\"],null,[[\"issue\",\"post\"],[[\"get\",[\"issue\"]],[\"get\",[\"pos\"]]]]],false],[\"text\",\"    \\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/submit.hbs" } });
});
define("ticket-system/templates/test", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4pOJwapV", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"\\nsdfkkdshfjdkshfkhfks\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/test.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ticket-system/config/environment', ['ember'], function(Ember) {
  var prefix = 'ticket-system';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ticket-system/app")["default"].create({"name":"ticket-system","version":"0.0.0+47d874c0"});
}

/* jshint ignore:end */
//# sourceMappingURL=ticket-system.map
