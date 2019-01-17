import Ember from 'ember';
const {RSVP} = Ember;

export default Ember.Route.extend( {
    model(){
	return RSVP.hash({
		projects: this.get('store').findAll('project',{reload: true}),
		issues: this.get('store').findAll('issue',{reload: true})
	});
    },


});
