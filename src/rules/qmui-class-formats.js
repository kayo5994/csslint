/*
 * Rule: test naming conventions of QMUI: no underscores in classnames
 */

CSSLint.addRule({
    
  // rule information
      
  id: "qmui-class-formats",
  name: "QMUI class name formats",
  desc: "Naming format does not follow the norm QMUI",
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

                if (/[^\.A-Za-z1-9_]/.test(modifier)){
                  reporter.report("Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).", modifier.line, modifier.col, rule);
                }
              }
            }

          }

        }

      }

    });
      
  }
 
});
