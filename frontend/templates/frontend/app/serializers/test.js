import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	normalize(model, hash, prop){
		console.log(hash); 
		console.log(prop);
		return this._super(...arguments);
	}, 

	pushPayload(store, payload){
		console.log(payload); 
		console.log('++++store+++++'); 
		console.log(store);
		let modifiedPayload = [];

		modifiedPayload.push(payload.test); 
		modifiedPayload.push(payload.test.cnl);

		return this._super(store,{test : modifiedPayload} );
	}

});
