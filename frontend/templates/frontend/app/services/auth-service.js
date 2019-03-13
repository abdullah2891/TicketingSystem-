import Ember from 'ember';

export default Ember.Service.extend({
	token: null,
	authenticate(username, password){
			return  new Promise((resolve, reject)=>{
				$.ajax({
					url: '/api/token/',
					method: 'POST', 
					data: JSON.stringify({
						username, 
						password
					}),
					contentType: "application/json;charset=utf-8",

				}).done(response=>{
					console.log(response.token, "test")
					this.set('token', response.token);
					resolve();
				}).fail(error => {
					console.log(error)
					reject();
				});

			});
			
	}
});
