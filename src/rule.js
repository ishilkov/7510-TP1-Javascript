var Atom = require('../src/atom');

var Rule = function() {
    this.id = null;
    this.prop = null;
    this.conds = [];

    this.build = function (entry) {
        var re = new RegExp('(.*):-(.*)');
        var res = re.exec(entry);
        this.buildProposition(res[1]);
        this.buildConditions(res[2]);
    }

    this.buildProposition = function (prop) {
        this.prop = new Atom();
        this.prop.build(prop);
        this.id = this.prop.id;
    }

    this.buildConditions = function (conds) {
        var re = new RegExp(',{0,1}(\\s*\\w+\\s*\\(\\s*\\w+\\s*[,\\s*\\w+\\s*]*\\)\\s*)', 'g');
        while ((match = re.exec(conds)) != null) {
            var cond = new Atom();
            cond.build(match[1]);
            this.conds.push(cond);
        }
    }


}

module.exports = Rule;