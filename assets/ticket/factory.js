'use strict';


(function (module) {
    
    function Ticket() {
        
    }
    
    Ticket.prototype = {
        title: 'Untitled',
        description: 'indescribable',
        status: null,
        constructor: Ticket,
        
        setStatus: function (status) {
            this.status = this.normalizeStatus(status);
        }
    };
    
    module.factory('Ticket', ['ticketStatusFilter',
                                function (filter) {
                                    Ticket.prototype.normalizeStatus = filter;
                                    return Ticket;
                                }]);
    
    
})(Swimlane);