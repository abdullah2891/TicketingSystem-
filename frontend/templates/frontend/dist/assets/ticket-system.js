"use strict";



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
define('ticket-system/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _emberBasicDropdownComponentsBasicDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdown['default'];
    }
  });
});
define('ticket-system/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _emberBasicDropdownComponentsBasicDropdownContentElement) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContentElement['default'];
    }
  });
});
define('ticket-system/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _emberBasicDropdownComponentsBasicDropdownContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContent['default'];
    }
  });
});
define('ticket-system/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _emberBasicDropdownComponentsBasicDropdownTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownTrigger['default'];
    }
  });
});
define('ticket-system/components/dashboard-view', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		actions: {
			setProject: function setProject(project) {
				if (project.get('issues')) {
					this.set('selected_issues', project.get('issues'));
					this.set('select_project_id', project.get('id'));
				}
			}
		}
	});
});
define('ticket-system/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
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
	var inject = _ember['default'].inject;
	exports['default'] = _ember['default'].Component.extend({
		store: inject.service(),

		actions: {
			submitIssue: function submitIssue() {
				var issue = this.get('store').createRecord('issue', {
					status: 'open'
				});

				if (!issue) {
					return false;
				}
				issue.set('title', this.get('issueTitle'));
				issue.set('description', this.get('issueTitle'));
				this.get('issues').pushObject(issue);

				issue.save().then(console.log)['catch'](console.warn);
			},
			selectIssue: function selectIssue(issue) {
				this.set('selectIssue', issue);
			}
		}
	});
});
define('ticket-system/components/issue/advanced-view', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({

		actions: {
			submitIssue: function submitIssue() {
				this.get('selectIssue').save().error(console.log);
			},
			cancel: function cancel() {
				this.set('selectIssue', null);
			}
		}
	});
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
define('ticket-system/components/paper-autocomplete-content', ['exports', 'ember-paper/components/paper-autocomplete-content'], function (exports, _emberPaperComponentsPaperAutocompleteContent) {
  exports['default'] = _emberPaperComponentsPaperAutocompleteContent['default'];
});
define('ticket-system/components/paper-autocomplete-dropdown', ['exports', 'ember-paper/components/paper-autocomplete-dropdown'], function (exports, _emberPaperComponentsPaperAutocompleteDropdown) {
  exports['default'] = _emberPaperComponentsPaperAutocompleteDropdown['default'];
});
define('ticket-system/components/paper-autocomplete-highlight', ['exports', 'ember-paper/components/paper-autocomplete-highlight'], function (exports, _emberPaperComponentsPaperAutocompleteHighlight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocompleteHighlight['default'];
    }
  });
});
define('ticket-system/components/paper-autocomplete-options', ['exports', 'ember-paper/components/paper-autocomplete-options'], function (exports, _emberPaperComponentsPaperAutocompleteOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocompleteOptions['default'];
    }
  });
});
define('ticket-system/components/paper-autocomplete-trigger-container', ['exports', 'ember-paper/components/paper-autocomplete-trigger-container'], function (exports, _emberPaperComponentsPaperAutocompleteTriggerContainer) {
  exports['default'] = _emberPaperComponentsPaperAutocompleteTriggerContainer['default'];
});
define('ticket-system/components/paper-autocomplete-trigger', ['exports', 'ember-paper/components/paper-autocomplete-trigger'], function (exports, _emberPaperComponentsPaperAutocompleteTrigger) {
  exports['default'] = _emberPaperComponentsPaperAutocompleteTrigger['default'];
});
define('ticket-system/components/paper-autocomplete', ['exports', 'ember-paper/components/paper-autocomplete'], function (exports, _emberPaperComponentsPaperAutocomplete) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocomplete['default'];
    }
  });
});
define('ticket-system/components/paper-backdrop', ['exports', 'ember-paper/components/paper-backdrop'], function (exports, _emberPaperComponentsPaperBackdrop) {
  exports['default'] = _emberPaperComponentsPaperBackdrop['default'];
});
define('ticket-system/components/paper-button', ['exports', 'ember-paper/components/paper-button'], function (exports, _emberPaperComponentsPaperButton) {
  exports['default'] = _emberPaperComponentsPaperButton['default'];
});
define('ticket-system/components/paper-card-actions', ['exports', 'ember-paper/components/paper-card-actions'], function (exports, _emberPaperComponentsPaperCardActions) {
  exports['default'] = _emberPaperComponentsPaperCardActions['default'];
});
define('ticket-system/components/paper-card-avatar', ['exports', 'ember-paper/components/paper-card-avatar'], function (exports, _emberPaperComponentsPaperCardAvatar) {
  exports['default'] = _emberPaperComponentsPaperCardAvatar['default'];
});
define('ticket-system/components/paper-card-content', ['exports', 'ember-paper/components/paper-card-content'], function (exports, _emberPaperComponentsPaperCardContent) {
  exports['default'] = _emberPaperComponentsPaperCardContent['default'];
});
define('ticket-system/components/paper-card-header-headline', ['exports', 'ember-paper/components/paper-card-header-headline'], function (exports, _emberPaperComponentsPaperCardHeaderHeadline) {
  exports['default'] = _emberPaperComponentsPaperCardHeaderHeadline['default'];
});
define('ticket-system/components/paper-card-header-subhead', ['exports', 'ember-paper/components/paper-card-header-subhead'], function (exports, _emberPaperComponentsPaperCardHeaderSubhead) {
  exports['default'] = _emberPaperComponentsPaperCardHeaderSubhead['default'];
});
define('ticket-system/components/paper-card-header-text', ['exports', 'ember-paper/components/paper-card-header-text'], function (exports, _emberPaperComponentsPaperCardHeaderText) {
  exports['default'] = _emberPaperComponentsPaperCardHeaderText['default'];
});
define('ticket-system/components/paper-card-header-title', ['exports', 'ember-paper/components/paper-card-header-title'], function (exports, _emberPaperComponentsPaperCardHeaderTitle) {
  exports['default'] = _emberPaperComponentsPaperCardHeaderTitle['default'];
});
define('ticket-system/components/paper-card-header', ['exports', 'ember-paper/components/paper-card-header'], function (exports, _emberPaperComponentsPaperCardHeader) {
  exports['default'] = _emberPaperComponentsPaperCardHeader['default'];
});
define('ticket-system/components/paper-card-icon-actions', ['exports', 'ember-paper/components/paper-card-icon-actions'], function (exports, _emberPaperComponentsPaperCardIconActions) {
  exports['default'] = _emberPaperComponentsPaperCardIconActions['default'];
});
define('ticket-system/components/paper-card-image', ['exports', 'ember-paper/components/paper-card-image'], function (exports, _emberPaperComponentsPaperCardImage) {
  exports['default'] = _emberPaperComponentsPaperCardImage['default'];
});
define('ticket-system/components/paper-card-media', ['exports', 'ember-paper/components/paper-card-media'], function (exports, _emberPaperComponentsPaperCardMedia) {
  exports['default'] = _emberPaperComponentsPaperCardMedia['default'];
});
define('ticket-system/components/paper-card-title-media', ['exports', 'ember-paper/components/paper-card-title-media'], function (exports, _emberPaperComponentsPaperCardTitleMedia) {
  exports['default'] = _emberPaperComponentsPaperCardTitleMedia['default'];
});
define('ticket-system/components/paper-card-title-text', ['exports', 'ember-paper/components/paper-card-title-text'], function (exports, _emberPaperComponentsPaperCardTitleText) {
  exports['default'] = _emberPaperComponentsPaperCardTitleText['default'];
});
define('ticket-system/components/paper-card-title', ['exports', 'ember-paper/components/paper-card-title'], function (exports, _emberPaperComponentsPaperCardTitle) {
  exports['default'] = _emberPaperComponentsPaperCardTitle['default'];
});
define('ticket-system/components/paper-card', ['exports', 'ember-paper/components/paper-card'], function (exports, _emberPaperComponentsPaperCard) {
  exports['default'] = _emberPaperComponentsPaperCard['default'];
});
define('ticket-system/components/paper-checkbox', ['exports', 'ember-paper/components/paper-checkbox'], function (exports, _emberPaperComponentsPaperCheckbox) {
  exports['default'] = _emberPaperComponentsPaperCheckbox['default'];
});
define('ticket-system/components/paper-chips', ['exports', 'ember-paper/components/paper-chips'], function (exports, _emberPaperComponentsPaperChips) {
  exports['default'] = _emberPaperComponentsPaperChips['default'];
});
define('ticket-system/components/paper-contact-chips', ['exports', 'ember-paper/components/paper-contact-chips'], function (exports, _emberPaperComponentsPaperContactChips) {
  exports['default'] = _emberPaperComponentsPaperContactChips['default'];
});
define('ticket-system/components/paper-content', ['exports', 'ember-paper/components/paper-content'], function (exports, _emberPaperComponentsPaperContent) {
  exports['default'] = _emberPaperComponentsPaperContent['default'];
});
define('ticket-system/components/paper-dialog-actions', ['exports', 'ember-paper/components/paper-dialog-actions'], function (exports, _emberPaperComponentsPaperDialogActions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperDialogActions['default'];
    }
  });
});
define('ticket-system/components/paper-dialog-container', ['exports', 'ember-paper/components/paper-dialog-container'], function (exports, _emberPaperComponentsPaperDialogContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperDialogContainer['default'];
    }
  });
});
define('ticket-system/components/paper-dialog-content', ['exports', 'ember-paper/components/paper-dialog-content'], function (exports, _emberPaperComponentsPaperDialogContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperDialogContent['default'];
    }
  });
});
define('ticket-system/components/paper-dialog-inner', ['exports', 'ember-paper/components/paper-dialog-inner'], function (exports, _emberPaperComponentsPaperDialogInner) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperDialogInner['default'];
    }
  });
});
define('ticket-system/components/paper-dialog', ['exports', 'ember-paper/components/paper-dialog'], function (exports, _emberPaperComponentsPaperDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperDialog['default'];
    }
  });
});
define('ticket-system/components/paper-divider', ['exports', 'ember-paper/components/paper-divider'], function (exports, _emberPaperComponentsPaperDivider) {
  exports['default'] = _emberPaperComponentsPaperDivider['default'];
});
define('ticket-system/components/paper-form', ['exports', 'ember-paper/components/paper-form'], function (exports, _emberPaperComponentsPaperForm) {
  exports['default'] = _emberPaperComponentsPaperForm['default'];
});
define('ticket-system/components/paper-grid-list', ['exports', 'ember-paper/components/paper-grid-list'], function (exports, _emberPaperComponentsPaperGridList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperGridList['default'];
    }
  });
});
define('ticket-system/components/paper-grid-tile-footer', ['exports', 'ember-paper/components/paper-grid-tile-footer'], function (exports, _emberPaperComponentsPaperGridTileFooter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperGridTileFooter['default'];
    }
  });
});
define('ticket-system/components/paper-grid-tile', ['exports', 'ember-paper/components/paper-grid-tile'], function (exports, _emberPaperComponentsPaperGridTile) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperGridTile['default'];
    }
  });
});
define('ticket-system/components/paper-icon', ['exports', 'ember-paper/components/paper-icon'], function (exports, _emberPaperComponentsPaperIcon) {
  exports['default'] = _emberPaperComponentsPaperIcon['default'];
});
define('ticket-system/components/paper-ink-bar', ['exports', 'ember-paper/components/paper-ink-bar'], function (exports, _emberPaperComponentsPaperInkBar) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperInkBar['default'];
    }
  });
});
define('ticket-system/components/paper-input', ['exports', 'ember-paper/components/paper-input'], function (exports, _emberPaperComponentsPaperInput) {
  exports['default'] = _emberPaperComponentsPaperInput['default'];
});
define('ticket-system/components/paper-item', ['exports', 'ember-paper/components/paper-item'], function (exports, _emberPaperComponentsPaperItem) {
  exports['default'] = _emberPaperComponentsPaperItem['default'];
});
define('ticket-system/components/paper-list', ['exports', 'ember-paper/components/paper-list'], function (exports, _emberPaperComponentsPaperList) {
  exports['default'] = _emberPaperComponentsPaperList['default'];
});
define('ticket-system/components/paper-menu-content-inner', ['exports', 'ember-paper/components/paper-menu-content-inner'], function (exports, _emberPaperComponentsPaperMenuContentInner) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuContentInner['default'];
    }
  });
});
define('ticket-system/components/paper-menu-content', ['exports', 'ember-paper/components/paper-menu-content'], function (exports, _emberPaperComponentsPaperMenuContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuContent['default'];
    }
  });
});
define('ticket-system/components/paper-menu-item', ['exports', 'ember-paper/components/paper-menu-item'], function (exports, _emberPaperComponentsPaperMenuItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuItem['default'];
    }
  });
});
define('ticket-system/components/paper-menu', ['exports', 'ember-paper/components/paper-menu'], function (exports, _emberPaperComponentsPaperMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenu['default'];
    }
  });
});
define('ticket-system/components/paper-optgroup', ['exports', 'ember-paper/components/paper-optgroup'], function (exports, _emberPaperComponentsPaperOptgroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperOptgroup['default'];
    }
  });
});
define('ticket-system/components/paper-option', ['exports', 'ember-paper/components/paper-option'], function (exports, _emberPaperComponentsPaperOption) {
  exports['default'] = _emberPaperComponentsPaperOption['default'];
});
define('ticket-system/components/paper-progress-circular', ['exports', 'ember-paper/components/paper-progress-circular'], function (exports, _emberPaperComponentsPaperProgressCircular) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperProgressCircular['default'];
    }
  });
});
define('ticket-system/components/paper-progress-linear', ['exports', 'ember-paper/components/paper-progress-linear'], function (exports, _emberPaperComponentsPaperProgressLinear) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperProgressLinear['default'];
    }
  });
});
define('ticket-system/components/paper-radio-group-label', ['exports', 'ember-paper/components/paper-radio-group-label'], function (exports, _emberPaperComponentsPaperRadioGroupLabel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperRadioGroupLabel['default'];
    }
  });
});
define('ticket-system/components/paper-radio-group', ['exports', 'ember-paper/components/paper-radio-group'], function (exports, _emberPaperComponentsPaperRadioGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperRadioGroup['default'];
    }
  });
});
define('ticket-system/components/paper-radio-proxiable', ['exports', 'ember-paper/components/paper-radio-proxiable'], function (exports, _emberPaperComponentsPaperRadioProxiable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperRadioProxiable['default'];
    }
  });
});
define('ticket-system/components/paper-radio', ['exports', 'ember-paper/components/paper-radio'], function (exports, _emberPaperComponentsPaperRadio) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperRadio['default'];
    }
  });
});
define('ticket-system/components/paper-reset-button', ['exports', 'ember-paper/components/paper-reset-button'], function (exports, _emberPaperComponentsPaperResetButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperResetButton['default'];
    }
  });
});
define('ticket-system/components/paper-select-content', ['exports', 'ember-paper/components/paper-select-content'], function (exports, _emberPaperComponentsPaperSelectContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectContent['default'];
    }
  });
});
define('ticket-system/components/paper-select-header', ['exports', 'ember-paper/components/paper-select-header'], function (exports, _emberPaperComponentsPaperSelectHeader) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectHeader['default'];
    }
  });
});
define('ticket-system/components/paper-select-menu-inner', ['exports', 'ember-paper/components/paper-select-menu-inner'], function (exports, _emberPaperComponentsPaperSelectMenuInner) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectMenuInner['default'];
    }
  });
});
define('ticket-system/components/paper-select-menu-trigger', ['exports', 'ember-paper/components/paper-select-menu-trigger'], function (exports, _emberPaperComponentsPaperSelectMenuTrigger) {
  exports['default'] = _emberPaperComponentsPaperSelectMenuTrigger['default'];
});
define('ticket-system/components/paper-select-menu', ['exports', 'ember-paper/components/paper-select-menu'], function (exports, _emberPaperComponentsPaperSelectMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectMenu['default'];
    }
  });
});
define('ticket-system/components/paper-select-options', ['exports', 'ember-paper/components/paper-select-options'], function (exports, _emberPaperComponentsPaperSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectOptions['default'];
    }
  });
});
define('ticket-system/components/paper-select-search', ['exports', 'ember-paper/components/paper-select-search'], function (exports, _emberPaperComponentsPaperSelectSearch) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectSearch['default'];
    }
  });
});
define('ticket-system/components/paper-select-trigger', ['exports', 'ember-paper/components/paper-select-trigger'], function (exports, _emberPaperComponentsPaperSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectTrigger['default'];
    }
  });
});
define('ticket-system/components/paper-select', ['exports', 'ember-paper/components/paper-select'], function (exports, _emberPaperComponentsPaperSelect) {
  exports['default'] = _emberPaperComponentsPaperSelect['default'];
});
define('ticket-system/components/paper-sidenav-container', ['exports', 'ember-paper/components/paper-sidenav-container'], function (exports, _emberPaperComponentsPaperSidenavContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSidenavContainer['default'];
    }
  });
});
define('ticket-system/components/paper-sidenav-inner', ['exports', 'ember-paper/components/paper-sidenav-inner'], function (exports, _emberPaperComponentsPaperSidenavInner) {
  exports['default'] = _emberPaperComponentsPaperSidenavInner['default'];
});
define('ticket-system/components/paper-sidenav-toggle', ['exports', 'ember-paper/components/paper-sidenav-toggle'], function (exports, _emberPaperComponentsPaperSidenavToggle) {
  exports['default'] = _emberPaperComponentsPaperSidenavToggle['default'];
});
define('ticket-system/components/paper-sidenav', ['exports', 'ember-paper/components/paper-sidenav'], function (exports, _emberPaperComponentsPaperSidenav) {
  exports['default'] = _emberPaperComponentsPaperSidenav['default'];
});
define('ticket-system/components/paper-slider', ['exports', 'ember-paper/components/paper-slider'], function (exports, _emberPaperComponentsPaperSlider) {
  exports['default'] = _emberPaperComponentsPaperSlider['default'];
});
define('ticket-system/components/paper-snackbar-text', ['exports', 'ember-paper/components/paper-snackbar-text'], function (exports, _emberPaperComponentsPaperSnackbarText) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSnackbarText['default'];
    }
  });
});
define('ticket-system/components/paper-speed-dial-actions-action', ['exports', 'ember-paper/components/paper-speed-dial-actions-action'], function (exports, _emberPaperComponentsPaperSpeedDialActionsAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSpeedDialActionsAction['default'];
    }
  });
});
define('ticket-system/components/paper-speed-dial-actions', ['exports', 'ember-paper/components/paper-speed-dial-actions'], function (exports, _emberPaperComponentsPaperSpeedDialActions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSpeedDialActions['default'];
    }
  });
});
define('ticket-system/components/paper-speed-dial-trigger', ['exports', 'ember-paper/components/paper-speed-dial-trigger'], function (exports, _emberPaperComponentsPaperSpeedDialTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSpeedDialTrigger['default'];
    }
  });
});
define('ticket-system/components/paper-speed-dial', ['exports', 'ember-paper/components/paper-speed-dial'], function (exports, _emberPaperComponentsPaperSpeedDial) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSpeedDial['default'];
    }
  });
});
define('ticket-system/components/paper-subheader', ['exports', 'ember-paper/components/paper-subheader'], function (exports, _emberPaperComponentsPaperSubheader) {
  exports['default'] = _emberPaperComponentsPaperSubheader['default'];
});
define('ticket-system/components/paper-switch', ['exports', 'ember-paper/components/paper-switch'], function (exports, _emberPaperComponentsPaperSwitch) {
  exports['default'] = _emberPaperComponentsPaperSwitch['default'];
});
define('ticket-system/components/paper-tab', ['exports', 'ember-paper/components/paper-tab'], function (exports, _emberPaperComponentsPaperTab) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperTab['default'];
    }
  });
});
define('ticket-system/components/paper-tabs', ['exports', 'ember-paper/components/paper-tabs'], function (exports, _emberPaperComponentsPaperTabs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperTabs['default'];
    }
  });
});
define('ticket-system/components/paper-toast-inner', ['exports', 'ember-paper/components/paper-toast-inner'], function (exports, _emberPaperComponentsPaperToastInner) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperToastInner['default'];
    }
  });
});
define('ticket-system/components/paper-toast-text', ['exports', 'ember-paper/components/paper-toast-text'], function (exports, _emberPaperComponentsPaperToastText) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperToastText['default'];
    }
  });
});
define('ticket-system/components/paper-toast', ['exports', 'ember-paper/components/paper-toast'], function (exports, _emberPaperComponentsPaperToast) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperToast['default'];
    }
  });
});
define('ticket-system/components/paper-toaster', ['exports', 'ember-paper/components/paper-toaster'], function (exports, _emberPaperComponentsPaperToaster) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperToaster['default'];
    }
  });
});
define('ticket-system/components/paper-toolbar-tools', ['exports', 'ember-paper/components/paper-toolbar-tools'], function (exports, _emberPaperComponentsPaperToolbarTools) {
  exports['default'] = _emberPaperComponentsPaperToolbarTools['default'];
});
define('ticket-system/components/paper-toolbar', ['exports', 'ember-paper/components/paper-toolbar'], function (exports, _emberPaperComponentsPaperToolbar) {
  exports['default'] = _emberPaperComponentsPaperToolbar['default'];
});
define('ticket-system/components/paper-tooltip-inner', ['exports', 'ember-paper/components/paper-tooltip-inner'], function (exports, _emberPaperComponentsPaperTooltipInner) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperTooltipInner['default'];
    }
  });
});
define('ticket-system/components/paper-tooltip', ['exports', 'ember-paper/components/paper-tooltip'], function (exports, _emberPaperComponentsPaperTooltip) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperTooltip['default'];
    }
  });
});
define('ticket-system/components/paper-virtual-repeat-scroller', ['exports', 'ember-paper/components/paper-virtual-repeat-scroller'], function (exports, _emberPaperComponentsPaperVirtualRepeatScroller) {
  exports['default'] = _emberPaperComponentsPaperVirtualRepeatScroller['default'];
});
define('ticket-system/components/paper-virtual-repeat', ['exports', 'ember-paper/components/paper-virtual-repeat'], function (exports, _emberPaperComponentsPaperVirtualRepeat) {
  exports['default'] = _emberPaperComponentsPaperVirtualRepeat['default'];
});
define('ticket-system/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
    }
  });
});
define('ticket-system/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleTrigger['default'];
    }
  });
});
define('ticket-system/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _emberPowerSelectComponentsPowerSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelect['default'];
    }
  });
});
define('ticket-system/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _emberPowerSelectComponentsPowerSelectBeforeOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectBeforeOptions['default'];
    }
  });
});
define('ticket-system/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _emberPowerSelectComponentsPowerSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectOptions['default'];
    }
  });
});
define('ticket-system/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _emberPowerSelectComponentsPowerSelectPlaceholder) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectPlaceholder['default'];
    }
  });
});
define('ticket-system/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _emberPowerSelectComponentsPowerSelectPowerSelectGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectPowerSelectGroup['default'];
    }
  });
});
define('ticket-system/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _emberPowerSelectComponentsPowerSelectSearchMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectSearchMessage['default'];
    }
  });
});
define('ticket-system/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
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
	var inject = _ember['default'].inject;
	exports['default'] = _ember['default'].Component.extend({
		store: inject.service(),

		actions: {
			setProject: function setProject(project) {
				this.sendAction('setProject', project);
			},
			submitProject: function submitProject() {
				var project = this.get('store').createRecord('project', {
					status: 'open'
				});
				if (!project) {
					return false;
				}
				project.set('projects', this.get('project'));

				project.save().then(console.log)['catch'](console.error);
			},
			deleteProject: function deleteProject(project) {
				project.deleteRecord();
				project.save();
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
define('ticket-system/components/transition-group', ['exports', 'ember-css-transitions/components/transition-group'], function (exports, _emberCssTransitionsComponentsTransitionGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsComponentsTransitionGroup['default'];
    }
  });
});
define('ticket-system/components/virtual-each', ['exports', 'virtual-each/components/virtual-each/component'], function (exports, _virtualEachComponentsVirtualEachComponent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _virtualEachComponentsVirtualEachComponent['default'];
    }
  });
});
define('ticket-system/helpers/-paper-underscore', ['exports', 'ember-paper/helpers/underscore'], function (exports, _emberPaperHelpersUnderscore) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperHelpersUnderscore['default'];
    }
  });
  Object.defineProperty(exports, 'underscore', {
    enumerable: true,
    get: function get() {
      return _emberPaperHelpersUnderscore.underscore;
    }
  });
});
define('ticket-system/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _emberTruthHelpersHelpersAnd) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersAnd['default'];
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersAnd.and;
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
define('ticket-system/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _emberConcurrencyHelpersCancelAll) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberConcurrencyHelpersCancelAll['default'];
    }
  });
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
define('ticket-system/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsGroup['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('ticket-system/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsSelected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('ticket-system/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('ticket-system/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _emberTruthHelpersHelpersEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersEqual['default'];
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersEqual.equal;
    }
  });
});
define('ticket-system/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _emberTruthHelpersHelpersGt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersGt['default'];
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersGt.gt;
    }
  });
});
define('ticket-system/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _emberTruthHelpersHelpersGte) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersGte['default'];
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersGte.gte;
    }
  });
});
define('ticket-system/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _emberTruthHelpersHelpersIsArray) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsArray['default'];
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsArray.isArray;
    }
  });
});
define('ticket-system/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _emberTruthHelpersHelpersIsEmpty) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEmpty['default'];
    }
  });
});
define('ticket-system/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('ticket-system/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _emberTruthHelpersHelpersLt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersLt['default'];
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersLt.lt;
    }
  });
});
define('ticket-system/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _emberTruthHelpersHelpersLte) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersLte['default'];
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersLte.lte;
    }
  });
});
define('ticket-system/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _emberTruthHelpersHelpersNotEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersNotEqual['default'];
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersNotEqual.notEq;
    }
  });
});
define('ticket-system/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _emberTruthHelpersHelpersNot) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersNot['default'];
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersNot.not;
    }
  });
});
define('ticket-system/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _emberTruthHelpersHelpersOr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersOr['default'];
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersOr.or;
    }
  });
});
define('ticket-system/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _emberConcurrencyHelpersPerform) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberConcurrencyHelpersPerform['default'];
    }
  });
});
define('ticket-system/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ticket-system/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ticket-system/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _emberConcurrencyHelpersTask) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberConcurrencyHelpersTask['default'];
    }
  });
});
define('ticket-system/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _emberTruthHelpersHelpersXor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersXor['default'];
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersXor.xor;
    }
  });
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
define('ticket-system/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrencyInitializersEmberConcurrency) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberConcurrencyInitializersEmberConcurrency['default'];
    }
  });
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
define('ticket-system/mixins/default-attrs', ['exports', 'virtual-each/mixins/default-attrs'], function (exports, _virtualEachMixinsDefaultAttrs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _virtualEachMixinsDefaultAttrs['default'];
    }
  });
});
define('ticket-system/mixins/transition-mixin', ['exports', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _emberCssTransitionsMixinsTransitionMixin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsMixinsTransitionMixin['default'];
    }
  });
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
define('ticket-system/serializers/application', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
	exports['default'] = _emberData['default'].RESTSerializer.extend({
		serializeIntoHash: function serializeIntoHash(hash, type, record, options) {
			_ember['default'].assign(hash, this.serialize(record, options));
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
define('ticket-system/services/constants', ['exports', '@ember/service', '@ember/object'], function (exports, _emberService, _emberObject) {
  exports['default'] = _emberService['default'].extend({

    sniffer: (0, _emberService.inject)('sniffer'),

    webkit: (0, _emberObject.computed)(function () {
      return (/webkit/i.test(this.get('sniffer.vendorPrefix'))
      );
    }),

    vendorProperty: function vendorProperty(name) {
      return this.get('webkit') ? '-webkit-' + name.charAt(0) + name.substring(1) : name;
    },

    CSS: (0, _emberObject.computed)('webkit', function () {
      var webkit = this.get('webkit');
      return {
        /* Constants */
        TRANSITIONEND: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
        ANIMATIONEND: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),

        TRANSFORM: this.vendorProperty('transform'),
        TRANSFORM_ORIGIN: this.vendorProperty('transformOrigin'),
        TRANSITION: this.vendorProperty('transition'),
        TRANSITION_DURATION: this.vendorProperty('transitionDuration'),
        ANIMATION_PLAY_STATE: this.vendorProperty('animationPlayState'),
        ANIMATION_DURATION: this.vendorProperty('animationDuration'),
        ANIMATION_NAME: this.vendorProperty('animationName'),
        ANIMATION_TIMING: this.vendorProperty('animationTimingFunction'),
        ANIMATION_DIRECTION: this.vendorProperty('animationDirection')
      };
    }),

    KEYCODE: _emberObject['default'].create({
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      TAB: 9
    }),

    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    MEDIA: {
      'xs': '(max-width: 599px)',
      'gt-xs': '(min-width: 600px)',
      'sm': '(min-width: 600px) and (max-width: 959px)',
      'gt-sm': '(min-width: 960px)',
      'md': '(min-width: 960px) and (max-width: 1279px)',
      'gt-md': '(min-width: 1280px)',
      'lg': '(min-width: 1280px) and (max-width: 1919px)',
      'gt-lg': '(min-width: 1920px)',
      'xl': '(min-width: 1920px)',
      'print': 'print'
    },

    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    MEDIA_PRIORITY: ['xl', 'gt-lg', 'lg', 'gt-md', 'md', 'gt-sm', 'sm', 'gt-xs', 'xs', 'print']
  });
});
define('ticket-system/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _emberCookiesServicesCookies) {
  exports['default'] = _emberCookiesServicesCookies['default'];
});
define('ticket-system/services/paper-sidenav', ['exports', 'ember-paper/services/paper-sidenav'], function (exports, _emberPaperServicesPaperSidenav) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperServicesPaperSidenav['default'];
    }
  });
});
define('ticket-system/services/paper-theme', ['exports', 'ember-paper/services/paper-theme'], function (exports, _emberPaperServicesPaperTheme) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperServicesPaperTheme['default'];
    }
  });
});
define('ticket-system/services/paper-toaster', ['exports', 'ember-paper/services/paper-toaster'], function (exports, _emberPaperServicesPaperToaster) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperServicesPaperToaster['default'];
    }
  });
});
define('ticket-system/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('ticket-system/services/sniffer', ['exports', '@ember/service', '@ember/object'], function (exports, _emberService, _emberObject) {

  var isString = function isString(value) {
    return typeof value === 'string';
  };

  var lowercase = function lowercase(string) {
    return isString(string) ? string.toLowerCase() : string;
  };

  var toInt = function toInt(str) {
    return parseInt(str, 10);
  };

  exports['default'] = _emberService['default'].extend({
    vendorPrefix: '',
    transitions: false,
    animations: false,
    _document: null,
    _window: null,

    android: (0, _emberObject.computed)('', function () {
      return toInt((/android (\d+)/.exec(lowercase((this.get('_window').navigator || {}).userAgent)) || [])[1]);
    }),

    init: function init() {
      this._super.apply(this, arguments);
      if (typeof FastBoot !== 'undefined') {
        return;
      }

      var _document = document;
      var _window = window;

      this.setProperties({
        _document: _document,
        _window: _window
      });

      var bodyStyle = _document.body && _document.body.style;
      var vendorPrefix = undefined,
          match = undefined;
      var vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

      var transitions = false;
      var animations = false;

      if (bodyStyle) {
        for (var prop in bodyStyle) {
          match = vendorRegex.exec(prop);
          if (match) {
            vendorPrefix = match[0];
            vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
            break;
          }
        }

        if (!vendorPrefix) {
          vendorPrefix = 'WebkitOpacity' in bodyStyle && 'webkit';
        }

        transitions = !!('transition' in bodyStyle || vendorPrefix + 'Transition' in bodyStyle);
        animations = !!('animation' in bodyStyle || vendorPrefix + 'Animation' in bodyStyle);

        if (this.get('android') && (!transitions || !animations)) {
          transitions = isString(bodyStyle.webkitTransition);
          animations = isString(bodyStyle.webkitAnimation);
        }
      }

      this.set('transitions', transitions);
      this.set('animations', animations);

      this.set('vendorPrefix', vendorPrefix);
    }

  });
});
/* globals FastBoot */
define('ticket-system/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _emberTextMeasurerServicesTextMeasurer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTextMeasurerServicesTextMeasurer['default'];
    }
  });
});
define('ticket-system/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ticket-system/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "psK0Ernf", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/application.hbs" } });
});
define("ticket-system/templates/components/dashboard-view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hm6fC277", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"layout-row flex\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"flex-20\"],[\"flush-element\"],[\"text\",\"\\n\\t  \"],[\"append\",[\"helper\",[\"project-list\"],null,[[\"projects\",\"setProject\"],[[\"get\",[\"model\",\"projects\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"setProject\"],null]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"flex-80\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"issue-list\"],null,[[\"issues\",\"projectId\"],[[\"get\",[\"selected_issues\"]],[\"get\",[\"select_project_id\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/dashboard-view.hbs" } });
});
define("ticket-system/templates/components/issue-card", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "634hTBfL", "block": "{\"statements\":[[\"text\",\"\\n    \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"list-group issue\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"post\",\"title\"]],false],[\"text\",\"\\n\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-ok-sign update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"updateIssue\",[\"get\",[\"post\",\"id\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-remove-sign update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteIssue\",[\"get\",[\"post\",\"id\"]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"        \\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"compare_string\"],[[\"get\",[\"post\",\"status\"]],\"closed\",\"not_equal\"],null]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n    \\n    \\n    \\n\\n    \\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"post\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"list-group-item\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"post\",\"status\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/issue-card.hbs" } });
});
define("ticket-system/templates/components/issue-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "oBASZfZL", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"padding-left-10\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"projectId\"]]],null,4],[\"text\",\"\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"layout-row flex\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"flex-\",[\"helper\",[\"if\"],[[\"get\",[\"selectIssue\"]],\"80\",\"100\"],null],\" border-left\"]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"paper-list\"],null,null,3],[\"text\",\"\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\n\"],[\"block\",[\"if\"],[[\"get\",[\"selectIssue\"]]],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"flex-20\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"issue/advanced-view\"],null,[[\"selectIssue\"],[[\"get\",[\"selectIssue\"]]]]],false],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"md-list-item-text pointer\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"selectIssue\",[\"get\",[\"issue\"]]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"issue\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"issue\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t      \"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t      \"],[\"append\",[\"unknown\",[\"paper-divider\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"paper-item\"],null,[[\"class\"],[\"md-3-line\"]],1]],\"locals\":[\"issue\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"issues\"]]],null,2]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submitIssue\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"paper-input\"],null,[[\"class\",\"label\",\"placeholder\",\"value\",\"onChange\"],[\"flex-30\",\"Issue\",\"Issues\",[\"get\",[\"issueTitle\"]],[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"issueTitle\"]]],null]],null]]]],false],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/issue-list.hbs" } });
});
define("ticket-system/templates/components/issue/advanced-view", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lt2zwfSE", "block": "{\"statements\":[[\"block\",[\"paper-form\"],null,[[\"class\",\"onSubmit\"],[\"border-left padding-left-10 project-tile\",[\"helper\",[\"action\"],[[\"get\",[null]],\"submitIssue\"],null]]],4]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t    Cancel\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"paper-icon\"],[\"cancel\"],null],false],[\"text\",\"\\n\\n\"],[\"block\",[\"paper-tooltip\"],null,[[\"position\"],[[\"get\",[\"position\"]]]],0],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t    Update\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"paper-icon\"],[\"update\"],null],false],[\"text\",\"\\n\\n\"],[\"block\",[\"paper-tooltip\"],null,[[\"position\"],[[\"get\",[\"position\"]]]],2],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"append\",[\"helper\",[\"form\",\"input\"],null,[[\"label\",\"value\",\"onChange\",\"required\"],[\"Title\",[\"get\",[\"selectIssue\",\"title\"]],[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"selectIssue\",\"title\"]]],null]],null],true]]],false],[\"text\",\"\\n\\n      \"],[\"append\",[\"helper\",[\"form\",\"input\"],null,[[\"label\",\"value\",\"textarea\",\"onChange\"],[\"Description\",[\"get\",[\"selectIssue\",\"description\"]],true,[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"selectIssue\",\"description\"]]],null]],null]]]],false],[\"text\",\"\\n\\n\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"layout-row float-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"paper-button\"],null,[[\"onClick\",\"iconButton\",\"raised\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"submitIssue\"],null],true,true]],3],[\"text\",\"\\n\"],[\"block\",[\"paper-button\"],null,[[\"onClick\",\"iconButton\",\"raised\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"cancel\"],null],true,true]],1],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[\"form\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/issue/advanced-view.hbs" } });
});
define("ticket-system/templates/components/my-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "al11RglF", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal fade\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-dialog\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-content\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-header\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"close\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"×\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"static-attr\",\"class\",\"modal-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"title\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-body\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"yield\",\"default\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"modal-footer\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-default\"],[\"static-attr\",\"data-dismiss\",\"modal\"],[\"flush-element\"],[\"text\",\"Close\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"button\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"ok\"]],[\"flush-element\"],[\"text\",\"OK\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/my-modal.hbs" } });
});
define("ticket-system/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fPBU2gg4", "block": "{\"statements\":[[\"block\",[\"paper-toolbar\"],null,null,2],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"append\",[\"helper\",[\"paper-icon\"],[\"check-circle\"],null],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Ticketing System\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"flex\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"paper-button\"],null,[[\"iconButton\"],[true]],0]],\"locals\":[]},{\"statements\":[[\"block\",[\"paper-toolbar-tools\"],null,null,1]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/nav-bar.hbs" } });
});
define("ticket-system/templates/components/project-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "HGaBWEFK", "block": "{\"statements\":[[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"name\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"glyphicon glyphicon-menu-right update-button\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"jumpToIssue\",[\"get\",[\"project_id\"]]]],[\"flush-element\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/project-component.hbs" } });
});
define("ticket-system/templates/components/project-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SJHNsu3M", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submitProject\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"append\",[\"helper\",[\"paper-input\"],null,[[\"class\",\"label\",\"placeholder\",\"value\",\"onChange\"],[\"flex-30\",\"Add Project\",\"Projects\",[\"get\",[\"project\"]],[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"project\"]]],null]],null]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"projects\"]]],null,3],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t    Delete Project\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"append\",[\"helper\",[\"paper-icon\"],[\"delete\"],null],false],[\"text\",\"\\n\"],[\"block\",[\"paper-tooltip\"],null,[[\"position\"],[true]],0]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"md-list-item-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"setProject\",[\"get\",[\"project\"]]]],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"project\",\"projects\"]],false],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"h4\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"project\",\"date_modified\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"paper-button\"],null,[[\"onClick\"],[[\"helper\",[\"action\"],[[\"get\",[null]],\"deleteProject\",[\"get\",[\"project\"]]],null]]],1],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"unknown\",[\"paper-divider\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"paper-item\"],null,[[\"class\"],[\"md-3-line project-tile pointer\"]],2]],\"locals\":[\"project\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/components/project-list.hbs" } });
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
  exports["default"] = Ember.HTMLBars.template({ "id": "HO31xKGw", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"nav-bar\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid \"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"dashboard-view\"],null,[[\"model\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\" \\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ticket-system/templates/issues.hbs" } });
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
define('ticket-system/utils/clamp', ['exports', 'ember-paper/utils/clamp'], function (exports, _emberPaperUtilsClamp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperUtilsClamp['default'];
    }
  });
});


define('ticket-system/config/environment', ['ember'], function(Ember) {
  var prefix = 'ticket-system';
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

});

if (!runningTests) {
  require("ticket-system/app")["default"].create({"name":"ticket-system","version":"0.0.0+2c05ae67"});
}
//# sourceMappingURL=ticket-system.map
