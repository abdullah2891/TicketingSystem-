import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';



export default Ember.Route.extend( {
    model(){
        var issue = this.get('store').findAll('issue');
        console.log(issue);
        return issue;
    }
});
