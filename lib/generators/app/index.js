const debug = require('debug')('create-umi:generator');
const BasicGenerator = require('../../BasicGenerator');

class Generator extends BasicGenerator {
  prompting() {
    if (this.opts.args && 'isTypeScript' in this.opts.args && 'reactFeatures' in this.opts.args) {
      this.prompts = {
        isTypeScript: this.opts.args.isTypeScript,
        reactFeatures: this.opts.args.reactFeatures,
      };
    } else {
      const prompts = [
        {
          name: 'isTypeScript',
          type: 'confirm',
          message: 'Do you want to use typescript?',
          default: false,
        },
        {
          name: 'isStyle',
          type: 'list',
          message: 'Do you want to use style?',
          choices: [
            { name: 'css', value: 'css' },
            { name: 'scss', value: 'scss' },
            { name: 'less', value: 'less' },
          ],
        },
        {
          name: 'isAxios',
          type: 'confirm',
          message: 'Do you want to use axios?',
          default: false,
        },
        {
          name: 'reactFeatures',
          message: 'What functionality do you want to enable?',
          type: 'checkbox',
          choices: [
            { name: 'antd', value: 'antd' },
            { name: 'dva', value: 'dva' },
            { name: 'code splitting', value: 'dynamicImport' },
            { name: 'dll', value: 'dll' },
            { name: 'internationalization', value: 'locale' },
          ],
        },
      ];
      return this.prompt(prompts).then(props => {
        this.prompts = props;
      });
    }
  }

  writing() {
    this.writeFiles({
      context: {
        name: this.name,
        ...this.prompts,
      },
      filterFiles: f => {
        const { isTypeScript, isStyle, isAxios, reactFeatures } = this.prompts;
        if (isStyle === 'css') {
          if (f.endsWith('.scss') || f.endsWith('.less')) return false;
        } else if (isStyle === 'scss') {
          if (f.endsWith('.css') || f.endsWith('.less')) return false;
        } else {
          if (f.endsWith('.css') || f.endsWith('.scss')) return false;
        }
        if (isAxios) {
          if (f.startsWith('src/services/request')) return false;
        } else {
          if (f.startsWith('src/services/axiosRequest')) return false;
        }
        if (isTypeScript) {
          if (f.endsWith('.js')) return false;
          if (!reactFeatures.includes('dva')) {
            if (f.startsWith('src/models') || f === 'src/app.ts') return false;
          }
          if (!reactFeatures.includes('locale')) {
            if (f.startsWith('src/locales') || f.includes('umi-plugin-locale')) return false;
          }
        } else {
          if (this.isTsFile(f)) return false;
          if (!reactFeatures.includes('dva')) {
            if (f.startsWith('src/models') || f === 'src/app.js') return false;
          }
          if (!reactFeatures.includes('locale')) {
            if (f.startsWith('src/locales') || f.includes('umi-plugin-locale')) return false;
          }
        }
        return true;
      },
    });
  }
}

module.exports = Generator;
