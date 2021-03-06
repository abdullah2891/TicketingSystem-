import Ember from 'ember';
const {inject} = Ember;
export default Ember.Component.extend({
	store: inject.service(),

	actions:{
		submitIssue(){
			const issue = this.get('store').createRecord('issue',{
				status: 'open',
				owner: this.get('owner')
			});

			if(!issue){
				return false;
			}
			issue.set('title' , this.get('issueTitle'));
			issue.set('description' , this.get('issueTitle'));
			this.get('issues').pushObject(issue);

			issue.save()
				.then(()=>{
					this.set('issueTitle',null);
				})
				.catch(console.warn);
			
		},
		selectIssue(issue){
			this.set('selectIssue', issue);
		}
	}
});
