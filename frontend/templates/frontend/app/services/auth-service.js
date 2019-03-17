import Ember from 'ember';

export default Ember.Service.extend({
	token: null,
	
	ajaxAction(url,data){
		return new Promise((resolve,reject)=>{
				$.ajax({
					url,
					method: 'POST', 
					data: JSON.stringify(data),
					contentType: "application/json;charset=utf-8",
				})
					.done(response=>{
						resolve(response)
					})
					.fail(error=>{
						reject(error)
					});
		});
	},

	authenticate(username, password){
			return this.ajaxAction('api/token/',{username,password})
					.then(response=>{
						console.log(response.token, "test")
						this.set('token', response.token);
					}).catch(error => {
						console.log(error)
					});
	},

	register(username, password, email){
		return this.ajaxAction('api/accounts',{username, password,email})
				.then(response=>this.authenticate(response.username,response.password))
	}
});
