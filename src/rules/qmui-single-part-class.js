/*
 * Rule: test single part class 
 */

CSSLint.addRule({
    
  // rule information
      
  id: "qmui-single-part-class",
  name: "QMUI single part class",
  desc: "A class-name should consists of two parts at least, a class-name only consists of one-word is error.",
  browsers: "All",
      
  // initialization
  init: function(parser, reporter) {
    "use strict";
    var rule = this;

    parser.addListener("startrule", function(event){
      var selectors = event.selectors,
      selector,
      part,
      modifier,
      i, j, k;

      for (i=0; i < selectors.length; i++){
        selector = selectors[i];

        for (j=0; j < selector.parts.length; j++){
          part = selector.parts[j];
          if (part.type === parser.SELECTOR_PART_TYPE){
            for (k=0; k < part.modifiers.length; k++){
              modifier = part.modifiers[k];
              if (modifier.type === "class"){

                if (modifier.toString().length <= 5) {
                  reporter.report("Class-name should consists of two parts at least.", modifier.line, modifier.col, rule);
                }
              }
            }

          }

        }

      }

    });

  }

});
