import Ember from 'ember';
const {$,inject} =  Ember;

export default Ember.Component.extend({
	authService : inject.service(),
	actions:{
		loginAction(){
			console.warn("login")
			const username = this.get('username');
			const password = this.get('password');
			
			this.get("authService")
					.authenticate(username, password).then(()=>{
					});
			
		}

	}
});
