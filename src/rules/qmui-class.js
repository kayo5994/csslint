/*
* Rule: test naming conventions: no underscores in classnames
*/

CSSLint.addRule({
    
  // rule information
      
  id: "classname-qmui",
  name: "QMUI class name rules",
  desc: "Class name does not follow the norm QMUI",
  browsers: "All",
      
  // initialization
      
  init: function(parser, reporter) {
    var rule = this;

    parser.addListener("startrule", function(event){
      var selectors = event.selectors,
      selector,
      part,
      modifier,
      i, j, k;

      for(i=0; i < selectors.length; i++){
        selector = selectors[i];

        for(j=0; j < selector.parts.length; j++){
          part = selector.parts[j];
          if(part.type == parser.SELECTOR_PART_TYPE){
            for(k=0; k < part.modifiers.length; k++){
              modifier = part.modifiers[k];
              if(modifier.type ==
                "class"
                ){

                if(/[^\.A-Za-z0-9-]/.test(modifier)){
                  reporter.report(
                    "Classnames should follow naming conventions: only alphanumeric and dashes!"
                    , modifier.line, modifier.col, rule);
                }
              }
            }

          }

        }

      }

    });
      
  }
 
});
