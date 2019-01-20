import Ember from 'ember';
const {inject} = Ember;
export default Ember.Component.extend({
	store: inject.service(),

	actions:{
		submitIssue(){
			const issue = this.get('store').createRecord('issue',{
				status: 'open'
			});

			if(!issue){
				return false;
			}
			this.set('newIssue.title' , issue);
			this.get('issues').pushObject(this.get('newIssue'));

			this.get('newIssue').save()
				.then(console.log)
				.catch(console.warn);
			
		},
		selectIssue(issue){
			this.set('selectIssue', issue);
		}
	}
});
