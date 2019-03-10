import Ember from 'ember';
const {inject} = Ember;

export default Ember.Component.extend({
	store: inject.service(),
	init(){
		this._super(...arguments);

		this.sendAction('setProject' , this.get('projects.firstObject'));

	},

	actions:{
		setProject(project){
			this.get('projects').forEach(proj=>{
				if(proj.get('id') === project.get('id')){
					project.set('show', true);
				}else{
					proj.set('show',false);
				}
			});
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
				.then(()=>{
					this.set('project', null);
				})
				.catch(console.error);
		},
		deleteProject(project){
			project.deleteRecord();
			project.save();
		}
	}
});
