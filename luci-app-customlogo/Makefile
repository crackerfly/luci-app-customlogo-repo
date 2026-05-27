include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-customlogo
PKG_VERSION:=1.0.4
PKG_RELEASE:=1

PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=Hevil

LUCI_TITLE:=LuCI Support for Custom Web UI Logo and Favicon
LUCI_DESCRIPTION:=A lightweight LuCI application for uploading and replacing the OpenWrt Web UI favicon and navigation bar logo.
LUCI_DEPENDS:=+luci-base
LUCI_PKGARCH:=all

define Package/$(PKG_NAME)/prerm
#!/bin/sh
[ -z "$$IPKG_INSTROOT" ] || exit 0

if [ -x /etc/init.d/customlogo ]; then
	/etc/init.d/customlogo stop >/dev/null 2>&1 || true
	/etc/init.d/customlogo disable >/dev/null 2>&1 || true
fi

exit 0
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
