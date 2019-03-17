import DS from 'ember-data';

export default DS.Model.extend({
    description: DS.attr(), 
    owner  : DS.attr('string'),
    status : DS.attr(),
    title : DS.attr(), 
    projects : DS.belongsTo('project')
});
