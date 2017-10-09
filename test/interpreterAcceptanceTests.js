var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');

describe("DB Build With Facts", function () {

    describe('Corrupted Facts', function () {
        
        var interpreter = null;

        beforeEach(function () {
            // runs before each test in this block
            interpreter = new Interpreter();
        });

        var corruptedFactDB = [
            "varon(juan).",
            "varon(pepe.",
        ]

        it("'varon(pepe' should throw exception", function () {
            expect(() => interpreter.parseDB(corruptedFactDB)).to.throw(Error, "can't parse: varon(pepe");
        });

        var corruptedFactDB2 = [
            "varon(juan).",
            "varon.",
        ]

        it("'varon' should throw exception", function () {
            expect(() => interpreter.parseDB(corruptedFactDB2)).to.throw(Error, "can't parse: varon");
        });
    })
})

describe("DB Build With Rules", function () {

    describe('Corrupted Rules', function () {
        
        var interpreter = null;
        
        beforeEach(function () {
            // runs before each test in this block
            interpreter = new Interpreter();
        });


        var corruptedRuleDB = [
            "varon(juan).",
            "varon(pepe).",
            "padre(X, Y) :- ."
        ]

        it("'padre(X, Y) :- ' should throw exception", function () {
            expect(() => interpreter.parseDB(corruptedRuleDB)).to.throw(Error, "can't parse rule: padre(X, Y) :- ");
        });

        var corruptedRuleDB2 = [
            "varon(juan).",
            "varon(pepe).",
            "padre(X, Y) :- varon(Y), (Y, .",
        ]

        it("'padre(X, Y) :- varon(Y), (Y, ' should throw exception", function () {
            expect(() => interpreter.parseDB(corruptedRuleDB2)).to.throw(Error, "can't parse rule: padre(X, Y) :- varon(Y), (Y, ");
        });
    })
})


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        // TODO: Add more tests

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)'));
        });

        // TODO: Add more tests

    });


});


