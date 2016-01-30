(function() {
    "use strict";
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Missing root class Error",

        "children class-name not missing root class-name should not result in a warning": function() {
            var result = CSSLint.verify(".a_b {float: left; } .a_b_c {float: left; }", { "qmui-miss-root-class": 1 });
            Assert.areEqual(0, result.messages.length);
        },

        "children class-name missing root class-name should result in a warning": function() {
            var result = CSSLint.verify(".a_b_c {float: left; }", { "qmui-miss-root-class": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Class-name .a_b_c shouldn't exist unless you've already set a class-name .a_b.", result.messages[0].message);
        },

        "Extend class-name missing root class-name should result in a warning": function() {
            var result = CSSLint.verify(".a_b_Extend {float: left; }", { "qmui-miss-root-class": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Class-name .a_b_Extend shouldn't exist unless you've already set a class-name .a_b.", result.messages[0].message);
        }

    }));

})();
