import Ember from 'ember';
const {inject} = Ember;

export default Ember.Component.extend({
	store: inject.service(),
	init(){
		this._super(...arguments);
		this.set('newProject', this.get('store').createRecord('project',{
			status: 'open'
		}));
	},
	actions:{
		setProject(project){
			this.sendAction('setProject',project);
		},
		submitProject(){
			const project = this.get('project');
			if(!project){
				return false;
			}
			this.set('newProject.projects', project);

			this.get('newProject').save()
				.then(console.log)
				.catch(console.error);
		},
		deleteProject(project){
			project.deleteRecord();
			project.save();
		}
	}
});
