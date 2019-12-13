app.directive("organisationTree", function() {
  return {
    template:
      '<organisation ng-repeat="node in tree.children.organisation"></organisation>',
    replace: true,
    restrict: "E",
    scope: {
      tree: "=children"
    }
  };
});
app.directive("organisation", function($compile) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/organisation.html",

    link: function(scope, element) {
      /*
            here we are checking that if current node has children then compiling/rendering children.
            */

      if (
        scope.node &&
        scope.node.children.site &&
        scope.node.children.site.length > 0
      ) {
        scope.node.childrenVisibility = true;

        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><site-tree children="node"></site-tree></ul>'
        )(scope);
        element.append(childNode);
      } else {
        scope.node.childrenVisibility = false;
      }
      if (scope.node && scope.node.children.organisation.length > 0) {
        scope.node.childrenVisibility = true;

        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><organisation-tree children="node"></organisation-tree></ul>'
        )(scope);
        element.append(childNode);
      }
    },
    controller: [
      "$scope",
      function($scope) {
        /*This function is for just toggle the visibility of children */
        $scope.toggleVisibility = function(node) {
          if (node.children) {
            node.childrenVisibility = !node.childrenVisibility;
          }
        };
        //Here we are marking check/un-check all the nodes.
        $scope.checkNode = function(node) {
          node.checked = !node.checked;
          console.log("check organisation");
          function checkChildren(c) {
            if (c.children.site) {
              angular.forEach(c.children.site, function(c) {
                c.checked = node.checked;
              });
            }
            if (c.children.organisation.length > 0) {
              angular.forEach(c.children.organisation, c => {
                c.checked = node.checked;
                if (c.children.site) {
                  c.children.site.forEach(element => {
                    element.checked = node.checked;
                  });
                }
                if (c.children.organisation.length > 0) {
                  c.children.organisation.forEach(c => {
                    c.checked = node.checked;
                    if (c.children.site) {
                      c.children.site.forEach(c => {
                        c.checked = node.checked;
                      });
                    }
                  });
                }
              });
            }
          }

          checkChildren(node);
        };
        
        $scope.countSite = function(node) {
          function count(item) {
            try {
              var c = 0;
              if (item.children.site && item.children.site.length > 0) {
                c += item.children.site.length;
              }
              if (item.children.organisation.length > 0) {
                item.children.organisation.forEach(element => {
                  c += count(element);
                });
              }
              return c;
            } catch (err) {
              console.log(err);
            }
          }

          return count(node);
        };
        $scope.totalSite = $scope.countSite($scope.node);
      }
    ]
  };
});
app.directive("siteTree", function() {
  return {
    template: '<site ng-repeat="node in tree.children.site"></site>',
    replace: true,
    restrict: "E",
    scope: {
      tree: "=children"
    },
    link: function(scope, element) {
      console.log(scope.tree);
    }
  };
});
app.directive("site", function($compile) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/site.html",
    scope: true,
    link: function(scope, element) {
      console.log(scope.$parent.$parent.tree);
      // here we are checking that if current node has children then compiling/rendering children
      if (
        scope.node &&
        scope.node.children.site &&
        scope.node.children.site.length > 0
      ) {
        scope.node.childrenVisibility = true;
        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><site-tree children="node"></site-tree></ul>'
        )(scope);
        element.append(childNode);
      } else {
        scope.node.childrenVisibility = false;
      }
      if (scope.node && scope.node.children.organisation.length > 0) {
        scope.node.childrenVisibility = true;

        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><organisation-tree children="node"></organisation-tree></ul>'
        )(scope);
        element.append(childNode);
      }
    },
    controller: [
      "$scope",
      function($scope) {
        // This function is for just toggle the visibility of children
        $scope.toggleVisibility = function(node) {
          if (node.children) {
            node.childrenVisibility = !node.childrenVisibility;
          }
        };
        //Here we are marking check/un-check all the nodes.
        $scope.checkNode = function(node) {
          node.checked = !node.checked;
          console.log("check site");
          console.log($scope.$parent.$parent.tree);
          
            let parent = $scope.$parent.$parent.tree;
            console.log(parent);
            let test;
            test = parent.children.site.filter(element => {
              return element.checked === true;
            });
            if (test.length === parent.children.site.length) {
              console.log("OK");
              parent.checked = true;
            } else {
              console.log("not yet");
              parent.checked = false;
            }
          
          function checkChildren(c) {
            if (c.children.site) {
              angular.forEach(c.children.site, function(c) {
                c.checked = node.checked;
              });
            }
            if (c.children.organisation.length > 0) {
              angular.forEach(c.children.organisation, c => {
                c.checked = node.checked;
                if (c.children.site) {
                  c.children.site.forEach(element => {
                    element.checked = node.checked;
                  });
                }
                if (c.children.organisation.length > 0) {
                  c.children.organisation.forEach(c => {
                    c.checked = node.checked;
                    if (c.children.site) {
                      c.children.site.forEach(c => {
                        c.checked = node.checked;
                      });
                    }
                  });
                }
              });
            }
          }

          checkChildren(node);
          
        };
      }
    ]
  };
});
