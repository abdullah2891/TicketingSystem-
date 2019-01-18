import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
	    setProject(project){
		    if(project.get('issues')){
			    this.set('selected_issues', project.get('issues'));
			    this.set('select_project_id', project.get('id'));
		    }	
	    }
	}
});
