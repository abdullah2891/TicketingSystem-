import Ember from 'ember';

export default Ember.Route.extend({

    actions: {
        error(error) {
            const auth_error = (((error || {}) || []).errors || []).find(error=> error.status === "401");

            if (auth_error) {
              this.transitionTo('login');
            }
        }
    }
});
