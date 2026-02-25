'use strict';
'require view';
'require form';
'require uci';
'require fs';

return view.extend({
	load: function() {
		return Promise.all([
			uci.load('customlogo')
		]);
	},

	render: function() {
		var m, s, o;

		m = new form.Map('customlogo', _('Custom Logo'),
			_('Upload and replace the OpenWrt Web UI Favicon and top-left Logo here. PNG and SVG formats are supported.'));

		s = m.section(form.NamedSection, 'main', 'customlogo', _('Basic Settings'));

		o = s.option(form.Flag, 'enable', _('Enable Custom Logo'));
		o.rmempty = false;

		// 增强版：自动纠错的校验器
		var validate_and_autoclear = function(section_id, value) {
			if (!value) return true; 
			
			var self = this; // 保存当前组件的上下文
			
			return fs.stat(value).then(function(stat) {
				if (stat && stat.type === 'file') {
					return true; // 文件存在，完美
				}
				// 查不到文件（遇到幽灵路径），直接强行清空 UI 输入框的值
				var uiElem = self.getUIElement(section_id);
				if (uiElem) uiElem.setValue('');
				return true; // 清空后直接放行，不弹红字报错
			}).catch(function() {
				// 发生异常（文件不存在），同样强行清空
				var uiElem = self.getUIElement(section_id);
				if (uiElem) uiElem.setValue('');
				return true; 
			});
		};

		o = s.option(form.FileUpload, 'favicon', _('Web Icon (Favicon)'), _('Recommended size: 32x32 or 64x64. PNG, ICO, or SVG files are supported.'));
		o.root_directory = '/etc/customlogo';
		o.optional = true;
		o.rmempty = true;
		o.depends('enable', '1');
		o.validate = validate_and_autoclear; // 绑定自动清空校验

		o = s.option(form.FileUpload, 'logo', _('Navigation Bar Logo'), _('The theme logo displayed in the top left corner. Recommended height: ~40px. PNG or SVG files are supported.'));
		o.root_directory = '/etc/customlogo';
		o.optional = true;
		o.rmempty = true;
		o.depends('enable', '1');
		o.validate = validate_and_autoclear; // 绑定自动清空校验

		return m.render();
	}
});
