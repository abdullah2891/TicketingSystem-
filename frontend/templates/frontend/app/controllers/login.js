import Ember from 'ember';
const {inject} = Ember;

export default Ember.Controller.extend({
    authService: inject.service(),
	showRegister: false,

    actions:{
        loginAction(){
			console.warn("login")
			const username = this.get('username');
			const password = this.get('password');
			
			this.get("authService")
					.authenticate(username, password).then(()=>{
                        this.transitionToRoute('index');
					});

		},
		register(){
			const showRegister = this.get('showRegister');
			
			if(showRegister){
				const {username, password, email} = this.getProperties('username', 'password','email');
				this.get('authService').register(username, password, email)
					.then(()=>{
						this.transitionToRoute('index');
					})

			}else{
				this.set('showRegister',true);
			}
		}
    }


});
