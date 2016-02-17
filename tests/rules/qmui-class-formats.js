(function() {
    "use strict";
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Naming format Errors",

        "A class-name follow the norm QMUI should not result in a warning": function() {
            var result = CSSLint.verify(".test_stage {float: left; }", { "qmui-class-formats": 1 });
            Assert.areEqual(0, result.messages.length);
        },

        "A class-name has line-through should result in a warning": function() {
            var result = CSSLint.verify(".line-through-class {float: left; }", { "qmui-class-formats": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).", result.messages[0].message);
        },

        "A class-name has number zero should result in a warning": function() {
            var result = CSSLint.verify(".zero_class0 {float: left; }", { "qmui-class-formats": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).", result.messages[0].message);
        },

        "A class-name only consists of one-word should result in a warning": function() {
            var result = CSSLint.verify(".test123 {float: left; }", { "qmui-class-formats": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Class-name should consists of two parts at least.", result.messages[0].message);
        }

    }));

})();
