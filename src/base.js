var Atom = require('../src/atom');
var Rule = require('../src/rule');

var Base = function () {
    
    this.rules = {};
    this.facts = [];
    
    this.build = function (entries) {
        entries.forEach(function(entry) {
            this.buildEntry(entry);
        }, this);
    }

    this.buildEntry = function (entry) {
        var re = new RegExp('.*:-.*');
        if (re.test(entry)) {
            var rule = new Rule();
            rule.build(entry);
            this.rules[rule.id] = rule;
        } else {
            var fact = new Atom();
            fact.build(entry);
            this.facts.push(fact);
        }         
    }

    this.getRule = function (id) {
        return this.rules[id];
    }

    this.getFacts = function (id) {
        var facts = [];
        this.facts.forEach(function(fact) {
            if (fact.id === id) {
                facts.push(fact);
            }
        }, this);

        return facts;
    }
}

module.exports = Base;