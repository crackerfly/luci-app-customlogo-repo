# luci-app-customlogo

A lightweight LuCI Web UI customization plugin for OpenWrt 24.10 and 25.12.

It allows users to upload and independently replace:

- Web UI favicon
- Navigation bar logo

Uploaded files are stored under `/etc/customlogo`.

## Features

- LuCI JS-based settings page
- Independent favicon and navigation logo configuration
- Bootstrap theme support
- Argon theme support
- UCI-based configuration
- Safe backend validation for uploaded files
- Automatic backup and restore of modified theme files
- Sysupgrade preservation for configuration and uploaded logo files
- GitHub Actions build for OpenWrt 24.10 and 25.12 x86/64 SDKs

## Supported file types

### Favicon

Supported extensions:

- `.ico`
- `.png`
- `.svg`

Maximum size: `512 KB`

For the most compatible `/favicon.ico` replacement, use `.ico`.

### Navigation bar logo

Supported extensions:

- `.png`
- `.svg`

Maximum size: `1024 KB`

SVG is recommended for sharp display.

## Supported themes

Currently optimized for:

- Bootstrap
- Argon

Other themes may still work partially, but are not guaranteed.

## Build

Clone this repository into an OpenWrt buildroot or SDK package directory:

```sh
git clone https://github.com/crackerfly/luci-app-customlogo-repo.git
```

Copy the package directory into your OpenWrt SDK:

```sh
cp -a luci-app-customlogo openwrt-sdk/package/
```

Then build:

```sh
cd openwrt-sdk
./scripts/feeds update -a
./scripts/feeds install -a
make defconfig
make package/luci-app-customlogo/compile V=s
```

The generated package can be found under:

```text
bin/packages/
```

OpenWrt 24.10 normally produces `.ipk` packages.

OpenWrt 25.12 normally produces `.apk` packages.

## Install

Upload the generated package to your OpenWrt device, then install it.

For OpenWrt 24.10:

```sh
opkg install luci-app-customlogo_*.ipk
```

For OpenWrt 25.12:

```sh
apk add --allow-untrusted luci-app-customlogo_*.apk
```

Then restart rpcd and uhttpd if the menu does not appear immediately:

```sh
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
```

## Usage

Open LuCI and go to:

```text
Services -> Custom Logo
```

Enable the plugin, upload your favicon and/or navigation bar logo, then save and apply.

## Restore default logo

Disable the plugin in LuCI and click Save & Apply.

You can also restore from SSH:

```sh
uci set customlogo.main.enable='0'
uci commit customlogo
/etc/init.d/customlogo reload
```

## Files preserved during sysupgrade

The package installs a keep file for:

```text
/etc/config/customlogo
/etc/customlogo/
```

This keeps your settings and uploaded logo files during sysupgrade.

## Notes

This package modifies files under `/www` to support existing LuCI themes.

Before modifying theme files, the original files are backed up with the suffix:

```text
.backup
```

When the plugin is disabled, stopped, reloaded, or removed, it attempts to restore the original files automatically.

## License

MIT License
