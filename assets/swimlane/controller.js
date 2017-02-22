'use strict';

(function (module) {
    
    function Controller(swimlane) {
        var vm = this;
        
        vm.statusList = ['planned',
                         'working_on',
                         'resolved',
                         'qa_tested',
                         'completed'];
        
        vm.add = function (title, description, status) {
            swimlane.create(title, description, status);
        };
        
        vm.list = function () {
            return swimlane.tickets;
        };
        
        
    }
    
    Controller.$inject = ["swimlane"];
    module.controller('Swimlane', ["swimlane",
                                    Controller]);
    
})(Swimlane);