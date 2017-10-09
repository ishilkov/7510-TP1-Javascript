var Base = require('./base');
var Atom = require('./atom');
var Rule = require('./rule');

var Interpreter = function () {

    this.base = null;

    this.parseDB = function (db) {
        var entries = [];
        db.forEach(function(entry) {
            entries.push(entry.replace('.', ''));
        });

        this.base = new Base();
        this.base.build(entries);    
    }
    
    this.checkQuery = function (query) {
        var prop = new Atom();
        prop.build(query);

        var rule = this.base.getRule(prop.id);

        if (rule) {
            return this.evaluateRule(prop, rule);
        } else {
            return this.evaluateFact(prop);
        }
    }

    this.evaluateFact = function (prop) {
        var facts = this.base.getFacts(prop.id);
        
        if (facts) {
            var isProp = false;
            facts.forEach(function(fact){
                var isFact = true;
                prop.args.forEach(function(arg, i){
                    if (fact.args[i] !== arg) {
                        isFact = false;
                    }         
                })
                if (isFact) {
                    isProp = true;
                }
            })
        }
        return isProp;
    }

    this.evaluateRule = function(prop, rule) {
        var argMap = this.mapProposition(prop, rule);
        var parsedConds = this.parseConditions(argMap, rule);

        var isRule = true;

        parsedConds.forEach(function(parsedCond){
            
            var isCond = false;

            this.base.getFacts(parsedCond.id).forEach(function(fact){
                var isFact = true;
                parsedCond.args.forEach(function(arg, i){
                    if (fact.args[i] !== arg) {
                        isFact = false;
                    }    
                })

                if (isFact) {
                    isCond = true;
                }
            })

            if (!isCond) {
                isRule = false;
            }
        }, this)
    
        return isRule;
    }

    this.mapProposition = function(prop, rule) {
        var argMap = {};
        rule.prop.args.forEach(function(arg, i) {
            argMap[arg] = prop.args[i];
        })
        return argMap;
    }

    this.parseConditions = function(argMap, rule) {
        var parsedConds = [];    

        rule.conds.forEach(function(cond) {
            var parsedArgs = [];
            cond.args.forEach(function(arg) {
                parsedArgs.push(argMap[arg]);
            });

            var parsedCond = new Atom();
            parsedCond.buildParsed(cond.id, parsedArgs);
            parsedConds.push(parsedCond);        
        })
        return parsedConds;
    }

}

module.exports = Interpreter;
