import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		setProject(project){
			this.sendAction('setProject',project);
		}

	}
});
