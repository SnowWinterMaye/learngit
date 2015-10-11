
app.controller('homepageCtrl', function ($state) {
    var vm = this;
    vm.greet = "Angular Test";
    
    vm.golagou = function(){
        $state.go('/lagou');
    }
}).controller('lagouCtrl',function(){
    var vs = this;
    vs.greet = "lagou";
    console.log('ZZZ');
}).factory('notesFactory', function() {
    return {
        put: function(note) {
            localStorage.setItem('note' + note.id, JSON.stringify(note));
            return this.getAll();
        },
        get: function(index) {
            return JSON.parse(localStorage.getItem('note' + index));
        },
        getAll: function() {
            var notes = [];
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).indexOf('note') !== -1) {
                    var note = localStorage.getItem(localStorage.key(i));
                    notes.push(JSON.parse(note));
                }
            }
            return notes;
        }
    };
});