import Ember from 'ember';
const {inject} = Ember;
export default Ember.Component.extend({
	store: inject.service(),
	init(){
		this._super(...arguments);
		this.set('newIssue', this.get('store').createRecord('issue',{
			status: 'open'
		}));
	},
	actions:{
		submitIssue(){
			const issue = this.get('issue');

			if(!issue){
				return false;
			}
			this.set('newIssue.title' , issue);
			this.set('newIssue.description' , issue);
			this.get('issues').pushObject(this.get('newIssue'));

			this.get('newIssue').save()
				.then(console.log)
				.catch(console.warn);
			
		}
	}
});
