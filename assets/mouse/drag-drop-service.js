'use strict';

(function (module) {
    
    function DragDrop() {
    }
    
    
    
    DragDrop.prototype = {
        dragged: null,
        callback: null,
        lockedTarget: null,
        constructor: DragDrop,
        
        hasDrag: function () {
            return !!(this.dragged && this.callback);
        },
        
        startDrag: function (data, callback) {
            var me = this;
            
            me.dragged = data;
            me.callback = function () {
                                var target = me.lockedTarget,
                                    cb = callback;
                                
                                if (target) {
                                    target(data, me);
                                }
                                
                                if (typeof cb === 'function') {
                                    callback(data, me);
                                }
                            };
        },
        
        endDrag: function () {
            var data = this.dragged,
                callback = this.callback;
                
            if (data && callback) {
                delete this.dragged;
                delete this.callback;
                
                callback();
                
                return data;
            }
            
            return null;
        },
        
        lockDropTarget: function (callback) {
            
            if (typeof callback === 'function') {
                this.lockedTarget = callback;
            }
            
        },
        
        unlockDropTarget: function (callback) {
            var current = this.lockedTarget;
            
            if (current && current === callback) {
                delete this.lockedTarget;
            }
            
            
        }
        
        
        
    };
    
    module.service('mouseDragDrop', [function () {
                                        return new DragDrop();
                                    }]);
    
    
})(Swimlane);