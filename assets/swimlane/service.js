'use strict';


(function (module) {
    
    var DEFAULT_STATUS = 'planned';
    
    
    function Swimlane(statusFilter, Ticket) {
        this.normalizeStatus = statusFilter;
        this.Ticket = Ticket;
        this.tickets = [];
    }
    
    Swimlane.prototype = {
        constructor: Swimlane,
        
        create: function (title, description, status) {
            var list = this.tickets;
            var ticket;
            
            if (typeof title === 'string' && typeof description === 'string') {
                status = this.normalizeStatus(status);
                if (!status) {
                    status = this.normalizeStatus(DEFAULT_STATUS);
                }
                
                ticket = new (this.Ticket)();
                ticket.title = title;
                ticket.description = description;
                ticket.status = status;
                list[list.length] = ticket;
                
            }
        }
    };
    
    
    
    
    module.service('swimlane', ['ticketStatusFilter',
                                "Ticket",
                                function (ticketStatus, Ticket) {
                                    return new Swimlane(ticketStatus, Ticket);
                                }]);
    
    
})(Swimlane);