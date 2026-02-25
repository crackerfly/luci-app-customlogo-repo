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

		m = new form.Map('customlogo', _('Custom Logo'),
			_('Upload and replace the OpenWrt Web UI Favicon and top-left Logo here. PNG and SVG formats are supported.'));

		s = m.section(form.TypedSection, 'customlogo', _('Basic Settings'));
		s.anonymous = true;

		o = s.option(form.Flag, 'enable', _('Enable Custom Logo'));
		o.rmempty = false;

		o = s.option(form.FileUpload, 'favicon', _('Web Icon (Favicon)'), _('Recommended size: 32x32 or 64x64. PNG, ICO, or SVG files are supported.'));
		o.root_directory = '/etc/customlogo';
		o.depends('enable', '1');

		o = s.option(form.FileUpload, 'logo', _('Navigation Bar Logo'), _('The theme logo displayed in the top left corner. Recommended height: ~40px. PNG or SVG files are supported.'));
		o.root_directory = '/etc/customlogo';
		o.depends('enable', '1');

		return m.render();
	}
});
