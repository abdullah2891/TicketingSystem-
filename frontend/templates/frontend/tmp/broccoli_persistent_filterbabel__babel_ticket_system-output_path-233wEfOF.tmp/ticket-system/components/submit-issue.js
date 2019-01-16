define('ticket-system/components/submit-issue', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        showForm: false,
        store: _ember['default'].inject.service(),
        IssueTitle: '',
        submitStatus: false,
        actions: {
            submit: function submit() {
                console.log("submitting");
                var store = this.get('store');

                var IssueTitle = this.get('IssueTitle'),
                    IssueDescription = this.get('IssueDescription'),
                    IssueOwner = this.get('IssueOwner');

                if (!(IssueTitle && IssueDescription && IssueOwner)) {
                    console.log("Failed to submit");
                    return;
                }

                // console.log("store ",store);
                var issue = store.createRecord('issue', {
                    "title": IssueTitle,
                    "description": IssueDescription,
                    "owner": IssueOwner,
                    "status": "open" //new issues are always should be open
                });

                issue.save().then((function (response) {
                    console.log(response);
                    this.sendAction('submit');
                }).bind(this));
            },
            submit_issue: function submit_issue() {
                console.log("showForm");
                this.toggleProperty('showForm');
            }
        }
    });
});