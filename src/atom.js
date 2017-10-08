var Atom = function(id, args) {
    
    this.id = id;
    this.args = args; 

    this.build = function(entry) {
        var re = new RegExp('\\s*(\\w+)\\s*\\((\\s*\\w+\\s*[,\\s*\\w+\\s*]*)\\)\\s*');
        var res = re.exec(entry);
        this.id = res[1];
        this.args = [];
        this.buildArgs(res[2]);
    }

    this.buildArgs = function (args) {
        var re = new RegExp(',{0,1}\\s*(\\w+)\\s*', 'g');
        while ((match = re.exec(args)) != null) {
            this.args.push(match[1]);
        }
    }
}

module.exports = Atom;