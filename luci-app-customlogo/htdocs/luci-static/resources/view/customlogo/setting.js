'use strict';
'require view';
'require form';
'require uci';
'require fs'; // 引入系统文件读取模块

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

		// 核心逻辑：定义一个异步文件存活校验器
		var validate_file_exists = function(section_id, value) {
			if (!value) return true; // 如果没填，让 optional 和 rmempty 规则去处理
			
			// 调用 ubus 接口查询真实的文件系统
			return fs.stat(value).then(function(stat) {
				if (stat && stat.type === 'file') {
					return true; // 文件存在，校验通过
				}
				// 查不到文件或不是普通文件，阻断保存并抛出错误提示
				return _('File does not exist. Please re-upload or clear the selection.');
			}).catch(function() {
				// 发生异常（如文件不存在引发的 404 错误）
				return _('File does not exist. Please re-upload or clear the selection.');
			});
		};

		o = s.option(form.FileUpload, 'favicon', _('Web Icon (Favicon)'), _('Recommended size: 32x32 or 64x64. PNG, ICO, or SVG files are supported.'));
		o.root_directory = '/etc/customlogo';
		o.optional = true;
		o.rmempty = true;
		o.depends('enable', '1');
		o.validate = validate_file_exists; // 绑定实时校验

		o = s.option(form.FileUpload, 'logo', _('Navigation Bar Logo'), _('The theme logo displayed in the top left corner. Recommended height: ~40px. PNG or SVG files are supported.'));
		o.root_directory = '/etc/customlogo';
		o.optional = true;
		o.rmempty = true;
		o.depends('enable', '1');
		o.validate = validate_file_exists; // 绑定实时校验

		return m.render();
	}
});
