var Atom = require('../src/atom');

var Rule = function() {
    this.id = null;
    this.prop = null;
    this.conds = [];

    this.build = function (entry) {
        var re = new RegExp('(\\s*\\w+\\s*\\(\\s*\\w+\\s*[,\\s*\\w+\\s*]*\\)\\s*):-(\\s*\\w+\\s*\\(\\s*\\w+\\s*[,\\s*\\w+\\s*]*\\)\\s*[,{0,1}\\s*\\w+\\s*\\(\\s*\\w+\\s*[,\\s*\\w+\\s*]*\\)\\s*]*)');
        var res = re.exec(entry);

        if (!res) {
            throw new Error("can't parse rule: " + entry);
        }

        this.buildProposition(res[1]);
        this.buildConditions(res[2]);
    }

    this.buildProposition = function (prop) {
        this.prop = new Atom();
        this.prop.build(prop);
        this.id = this.prop.id;
    }

    this.buildConditions = function (conds) {
        var re = new RegExp(',{0,1}\\s*\\w+\\s*\\(\\s*\\w+\\s*[,\\s*\\w+\\s*]*\\)\\s*');
        while ((match = re.exec(conds)) != null) {
            var parsed = match[0];
            var cond = new Atom();
            cond.build(parsed);
            this.conds.push(cond);
            conds = conds.replace(parsed, '');
        }
        if (conds !== '') {
            throw new Error ("Can't parse rule conditions: " + conds); 
        }
    }
}

module.exports = Rule;