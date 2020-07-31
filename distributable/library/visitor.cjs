"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Visitor = void 0;

var _helperModuleImports = require("@babel/helper-module-imports");

var _is = _interopRequireDefault(require("@pwn/is"));

var ModuleParser = _interopRequireWildcard(require("@babel/parser"));

var _visitor = require("@virtualpatterns/mablung-babel-plugin/visitor");

var _invalidImportTypeReplaceIdentifierError = require("./error/invalid-import-type-replace-identifier-error.cjs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Parser = ModuleParser.default || ModuleParser;

class Visitor extends _visitor.Visitor {
  constructor(babel) {
    super(babel);
    this._programPath = null;
    this._importIdentifier = null;
  }

  get nodeType() {
    return ['Program', 'Identifier'];
  }

  onProgramNode(path) {
    // console.log(`Visitor.onProgramNode('${path.node.name}')`)
    this._programPath = path;
    this._importIdentifier = null;
  }

  onIdentifierNode(path, state) {
    // console.log(`Visitor.onIdentifierNode('${path.node.name}', state)`)
    let option = state.opts;
    let rule = option.rule;
    rule.forEach(rule => {
      rule.searchForPattern = rule.searchForPattern ? rule.searchForPattern : _is.default.regexp(rule.searchFor) ? rule.searchFor : new RegExp(rule.searchFor, 'gi');
      rule.parserOption = rule.parserOption ? rule.parserOption : {};

      if (rule.searchForPattern.test(path.node.name)) {
        // console.log(`Replacing '${path.node.name}' with '${rule.replaceWith}'`)
        // if (rule.parserOption) {
        //   console.dir(rule.parserOption)
        // }
        if (_is.default.null(this._importIdentifier)) {
          rule.addImport = rule.addImport ? rule.addImport : [];
          rule.addImport.forEach(addImport => {
            switch (addImport.type) {
              case 'default':
                this._importIdentifier = (0, _helperModuleImports.addDefault)(this._programPath, addImport.source, addImport.option);
                break;

              case 'named':
                this._importIdentifier = (0, _helperModuleImports.addNamed)(this._programPath, addImport.name, addImport.source, addImport.option);
                break;

              case 'namespace':
                this._importIdentifier = (0, _helperModuleImports.addNamespace)(this._programPath, addImport.source, addImport.option);
                break;

              case 'sideEffect':
                (0, _helperModuleImports.addSideEffect)(this._programPath, addImport.source);
                break;

              default:
                throw new _invalidImportTypeReplaceIdentifierError.InvalidImportTypeReplaceIdentifierError(addImport.type);
            }
          });
          rule.replaceWith = _is.default.null(this._importIdentifier) ? rule.replaceWith : rule.replaceWith.replace(/__importIdentifier/gi, this._importIdentifier.name);
          rule.replaceWithNode = rule.replaceWithNode ? rule.replaceWithNode : Parser.parseExpression(rule.replaceWith, rule.parserOption);
          this._importIdentifier = null;
        }

        path.replaceWith(rule.replaceWithNode);
      }
    });
  }

}

exports.Visitor = Visitor;
//# sourceMappingURL=visitor.cjs.map