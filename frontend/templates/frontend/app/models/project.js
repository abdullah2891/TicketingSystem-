import DS from 'ember-data';

export default DS.Model.extend({
	date_created: DS.attr('string'),
	date_modified: DS.attr('string'),
	owner: DS.attr('string'),
	projects: DS.attr('string'),

	issues: DS.hasMany('issue')
});
