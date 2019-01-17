import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
	normalizeResponse(store, primaryModelClass, payload, id, requestType){
		const modified_payload = {
			'issue' : payload
		};
		console.log(modified_payload)
		return this._super(store,primaryModelClass,modified_payload,id,requestType);
	}
});
