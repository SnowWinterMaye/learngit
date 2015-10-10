app.directive('myDragble', function($document) {
        return function(scope, element, attr) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;

            element.css({
                position: 'relative',
                border: '1px solid lightgrey',
                cursor: 'pointer',
                width:'100px',
                height:'100px',
            });

            element.on('mousedown', function(event) {
                event.preventDefault();
                startX = event.screenX - x;
                startY = event.screenY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px',
                    cursor: 'move'
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }

        };
    }).directive('notePad', function(notesFactory) {
        return {
            restrict: 'AE',
            scope: {},
            link: function(scope, elem, attrs) {
                scope.openEditor = function(index) {
                    scope.editMode = true;
                    if (index !== undefined) {
                        scope.noteText = notesFactory.get(index).content;
                        scope.index = index;
                    } else
                        scope.noteText = undefined;
                };
                scope.save = function() {
                    if (scope.noteText !== "" && scope.noteText !== undefined) {
                        var note = {};
                        note.title = scope.noteText.length > 10 ? scope.noteText.substring(0, 10) + '. . .' : scope.noteText;
                        note.content = scope.noteText;
                        note.id = scope.index != -1 ? scope.index : localStorage.length;
                        scope.notes = notesFactory.put(note);
                    }
                    scope.restore();
                };


                scope.restore = function() {
                    scope.editMode = false;
                    scope.index = -1;
                    scope.noteText = "";
                };

                var editor = elem.find('#editor');

                scope.restore();

                scope.notes = notesFactory.getAll();

                editor.bind('keyup keydown', function() {
                    scope.noteText = editor.text().trim();
                });

            },
            templateUrl: 'view/template/note.html'
        };
    })