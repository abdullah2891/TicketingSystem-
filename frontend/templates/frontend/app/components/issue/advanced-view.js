import Ember from 'ember';

export default Ember.Component.extend({
	
	actions:{
		submitIssue(){
			this.get('selectIssue').save()
				.error(console.log);
		},
		cancel(){
			this.set('selectIssue', null);
		}
	}
});
