define('ticket-system/components/issue-card', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        store: _ember['default'].inject.service(),
        issues: function issues() {
            var issue = this.get('store').findAll('issue');
            console.log(issue);
            return issue;
        },
        actions: {
            updateIssue: function updateIssue(id) {
                var store = this.get('store');
                // linked list to change status
                var statusChange = {
                    "open": "working",
                    "working": "closed",
                    "closed": "open"
                };

                store.find('issue', id).then(function (issue) {
                    var status = issue.get('status');
                    console.log(status);
                    issue.set('status', statusChange[status]);
                    issue.save().then(function (response) {
                        console.log(response);
                    });
                });

                console.log("clicked", id);
            },
            deleteIssue: function deleteIssue(id) {
                var store = this.get('store');
                console.log("delete clcked");
                store.find('issue', id).then(function (issue) {
                    issue.destroyRecord();
                });
            }
        }
    });
});