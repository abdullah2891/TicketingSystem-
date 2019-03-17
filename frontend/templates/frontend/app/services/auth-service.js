import Ember from 'ember';

export default Ember.Service.extend({
	token: null,
	
	ajaxAction(url,data){
		return new Promise((resolve,reject)=>{
				Ember.$.ajax({
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

	createCookie(name, value, days) {
		let expires;

		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
	},
	readCookie(name) {
		const nameEQ = encodeURIComponent(name) + "=";
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' '){
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0){
				return decodeURIComponent(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	},
	authenticate(username, password){
			return this.ajaxAction('api/token/',{username,password})
					.then(response=>{
						this.set('token', response.token);
						this.createCookie('token',response.token);
					}).catch(error => {
						console.log(error)
					});
	},

	register(username, password, email){
		return this.ajaxAction('api/accounts',{username, password,email})
				.then(response=>this.authenticate(response.username,response.password))
	}
});
