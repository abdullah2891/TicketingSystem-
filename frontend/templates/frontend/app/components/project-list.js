import Ember from 'ember';
const {inject} = Ember;

export default Ember.Component.extend({
	store: inject.service(),

	actions:{
		setProject(project){
			this.sendAction('setProject',project);
		},
		submitProject(){
			const project = this.get('store').createRecord('project',{
				status: 'open'
			});
			if(!project){
				return false;
			}
			project.set('projects', this.get('project'));

			project.save()
				.then(console.log)
				.catch(console.error);
		},
		deleteProject(project){
			project.deleteRecord();
			project.save();
		}
	}
});
