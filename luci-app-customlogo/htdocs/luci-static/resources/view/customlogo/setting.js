'use strict';
'require view';
'require form';
'require uci';

return view.extend({
	load: function() {
		return Promise.all([
			uci.load('customlogo')
		]);
	},

	render: function() {
		var m, s, o;

		m = new form.Map('customlogo', _('自定义 Logo (Custom Logo)'),
			_('在这里上传并替换 OpenWrt Web UI 的网页图标 (Favicon) 和左上角 Logo。支持 PNG 和 SVG 格式。'));

		s = m.section(form.TypedSection, 'customlogo', _('基本设置'));
		s.anonymous = true;

		o = s.option(form.Flag, 'enable', _('启用自定义 Logo'));
		o.rmempty = false;

		o = s.option(form.FileUpload, 'favicon', _('网页图标 (Favicon)'), _('建议尺寸 32x32 或 64x64 的 PNG/ICO/SVG 文件。'));
		o.root_directory = '/etc/customlogo';
		o.depends('enable', '1');

		o = s.option(form.FileUpload, 'logo', _('导航栏 Logo'), _('显示在左上角的主题 Logo。建议高度约 40px 的 PNG 或 SVG 文件。'));
		o.root_directory = '/etc/customlogo';
		o.depends('enable', '1');

		return m.render();
	}
});