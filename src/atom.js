var Atom = function() {
    
    this.id = null;
    this.args = []; 

    this.build = function(entry) {
        var re = new RegExp('\\s*(\\w+)\\s*\\((\\s*\\w+\\s*[,\\s*\\w+\\s*]*)\\)\\s*');
        var res = re.exec(entry);
        this.id = res[1];
        this.buildArgs(res[2]);
    }

    this.buildArgs = function (args) {
        var re = new RegExp(',{0,1}\\s*(\\w+)\\s*', 'g');
        while ((match = re.exec(args)) != null) {
            this.args.push(match[1]);
        }
    }

    this.buildParsed = function(id, args) {
        this.id = id;
        this.args = args; 
    }
}

module.exports = Atom;