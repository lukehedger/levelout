/*auto-generated*/
import Ractive from 'ractive';
{{#modules}}import {{nameCamel}} from './{{file}}';
{{/modules}}
{{#modules}}Ractive.components['ui-{{name}}'] = {{nameCamel}};
{{/modules}}
export default Ractive;
