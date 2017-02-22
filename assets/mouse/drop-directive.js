'use strict';


(function (module) {
    
    
    function directive(dragDropService) {
        
        
        return {
            link: function (scope, element, attribute) {
                var service = dragDropService,
                    dropActionAttr = attribute.mouseDrop;
                
                function lockTarget(data) {
                    if (dropActionAttr) {
                        scope.$evalAsync(dropActionAttr, {
                            "$dropData": data
                        });
                    }
                    
                }
                
                function onMouseEnter() {
                    service.lockDropTarget(lockTarget);
                }
                
                function onMouseLeave() {
                    service.unlockDropTarget(lockTarget);
                }
                
                
                element.on('mouseenter', onMouseEnter);
                element.on('mouseleave', onMouseLeave);
                
                scope.$on('$destroy',
                          function () {
                                element.off('mouseenter', onMouseEnter);
                                element.off('mouseleave', onMouseLeave);
                          });
            }
        };
        
        
    }
    
    
    module.directive('mouseDrop', ['mouseDragDrop',
                                   directive]);
    
})(Swimlane);