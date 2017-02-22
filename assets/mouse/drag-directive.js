'use strict';


(function (module) {
    
    
    function directive(dragDropService) {
        
        
        return {
            
            link: function (scope, element, attribute) {
                
                var ng = angular,
                    STARTED = false,
                    doc = document,
                    dragLabelAttr = attribute.mouseDragLabel,
                    onDragAttr = attribute.mouseDrag,
                    service = dragDropService,
                    BODY = ng.element(doc.body),
                    dragClass = 'dragging',
                    proxy = ng.element(doc.createElement('div'));
                
                
                function onMousedown(event) {
                    
                    if (!STARTED) {
                        STARTED = true;
                        event.preventDefault();
                        
                        BODY.on('mousemove', onMousemove);
                        BODY.on('mouseup', onMouseup);
                        
                        if (dragLabelAttr) {
                            proxy.html(scope.$eval(dragLabelAttr) || 'dragging');
                        }
                        
                        proxy.addClass(dragClass);
                    
                        proxy.css({
                            left: '' + (event.clientX + 5) + 'px',
                            top: '' + (event.clientY + 5) + 'px',
                        });
                        
                        scope.$evalAsync('$$service.startDrag($$data, $$cb)',
                                        {
                                            "$$service": service,
                                            "$$data": scope.$eval(onDragAttr),
                                            "$$cb": onDrop
                                        });
                        
                    }
                    
                    
                }
                
                function onMousemove(event) {
                    
                    proxy.css({
                        left: '' + (event.clientX + 5) + 'px',
                        top: '' + (event.clientY + 5) + 'px',
                    });
                    
                }
                
                function onMouseup() {
                    proxy.removeClass(dragClass);
                    BODY.off('mousemove', onMousemove);
                    BODY.off('mouseup', onMouseup);
                    service.endDrag();
                    
                }
                
                function onDrop() {
                    
                }
                
                proxy.addClass('mouse-drag-proxy');
                element.on('mousedown', onMousedown);
                
                BODY[0].appendChild(proxy[0]);
                
                
                if (typeof dragLabelAttr !== 'string') {
                    dragLabelAttr = null;
                }
                
                if (typeof onDragAttr !== 'string') {
                    onDragAttr = null;
                }
                
                
                scope.$on('$destroy',
                    function () {
                        element.off('mousedown', onMousedown);
                        BODY.off('mousemove', onMousemove);
                        BODY.off('mouseup', onMouseup);
                    });
                
            }
            
            
            
        };
        
    }
    
    
    
    module.directive('mouseDrag', ["mouseDragDrop",
                                   directive]);
    
    
    
    
    
})(Swimlane);