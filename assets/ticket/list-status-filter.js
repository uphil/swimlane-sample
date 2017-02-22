'use strict';


(function (module) {
    
    function filterListByStatus(tickets, status) {
        var main = filterListByStatus,
            Class = main.Ticket,
            statusFilter = main.statusFilter,
            toString = Object.prototype.toString,
            newTickets = [],
            tl = 0;
        var c, l, item;
        
        status = statusFilter(status);
        
        if (toString.call(tickets) === '[object Array]' && status) {
            
            for (c = -1, l = tickets.length; l--;) {
                item = tickets[++c];
                if (item instanceof Class && item.status.name === status.name) {
                    newTickets[tl++] = item;
                }
            }
        
        }
        
        return newTickets;
        
    }
    
    module.filter('ticketListStatus', ["Ticket",
                                       "ticketStatusFilter",
                                        function (Ticket, statusFilter) {
                                            var filter = filterListByStatus;
                                            
                                            filter.Ticket = Ticket;
                                            filter.statusFilter = statusFilter;
                                            
                                            return filter;
                                        }]);
    
})(Swimlane);