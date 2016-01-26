(function() {
    "use strict";
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Naming format Errors",

        "class name has line-through should result in a warning": function() {
            var result = CSSLint.verify(".line-through-class {float: left; }", { "qmui-class-formats": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).", result.messages[0].message);
        },

        "class name has number zero should result in a warning": function() {
            var result = CSSLint.verify(".zero_class0 {float: left; }", { "qmui-class-formats": 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).", result.messages[0].message);
        }

    }));

})();
