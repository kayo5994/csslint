/*
 * Rule: test root class 
 */

CSSLint.addRule({
    
  // rule information
      
  id: "qmui-miss-root-class",
  name: "QMUI miss root class",
  desc: "A class-name like a_b_c shouldn't exist unless you've already set a class-name like a_b.",
  browsers: "All",
      
  // initialization
  init: function(parser, reporter) {
    "use strict";
    var rule = this,
        rootClassList = [], // 样式表中存在的 Root Class 的集合
        childClassList = []; // 样式表中需要的 Root Class 的集合

    parser.addListener("startrule", function(event){
      var selectors = event.selectors,
      selector,
      part,
      modifier,
      composition,
      i, j, k;

      for (i=0; i < selectors.length; i++){
        selector = selectors[i];

        for (j=0; j < selector.parts.length; j++){
          part = selector.parts[j];
          if (part.type === parser.SELECTOR_PART_TYPE){
            for (k=0; k < part.modifiers.length; k++){
              modifier = part.modifiers[k];
              if (modifier.type === "class"){

                composition = modifier.toString().split("_");

                if (composition.length >= 3) {
                  // 如果为 children class-name，则存储到 Child Class 数组中，以便后面作对比
                  childClassList.push(modifier);
                } else if (composition.length === 2) {
                  // 如果为 root class-name，则存储到 Root Class 数组中，以便后面作对比
                  rootClassList.push(modifier);
                }
              }
            }

          }

        }

      }

    });

    parser.addListener("endstylesheet", function(){
      var i, modifier, composition, rootClass;

      for (i=0; i < childClassList.length; i++){
        modifier = childClassList[i];
        composition = modifier.toString().split("_");
        rootClass = composition[0] + "_" + composition[1];

        if (!rule.isElementInArray(rootClassList, rootClass)) {
          reporter.report("Class-name " + modifier + " shouldn't exist unless you've already set a class-name " + rootClass + ".", modifier.line, modifier.col, rule);
        }
      }

    });

  },

  isElementInArray: function(arr, obj) {
    "use strict";
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].toString() === obj.toString()) {
        return true;
      }
    }
    return false;
  }
 
});
