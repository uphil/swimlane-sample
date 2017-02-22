'use strict';

(function (module) {
    
    var STATUS = {
                    "planned": "Planned",
                    "working_on": "Working On",
                    "resolved": "Resolved",
                    "qa_tested": "QA Tested",
                    "completed": "Completed"
            },
        SNAKISIZE_RE = /[^a-z]/i;
    
    function normalizeStatus(status) {
        var hasOwn = Object.prototype.hasOwnProperty,
            definitions = STATUS;
        
        if (typeof status === 'string') {
            
            status = status.replace(SNAKISIZE_RE, '_').toLowerCase();
            
            if (hasOwn.call(definitions, status)) {
                return {
                    name: status,
                    label: definitions[status]
                };
            }
        }
        
        return null;
    }
    
    module.filter('ticketStatus', function () {
                                    return normalizeStatus;
                                });
    
    
})(Swimlane);


