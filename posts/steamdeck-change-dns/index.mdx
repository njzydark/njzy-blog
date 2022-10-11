---
title: SteamDeck修改DNS使其永久生效
date: '2022-10-07'
desc: '在SteamDeck上修改DNS并使其永久生效, 从而使 clash tun 模式下的 dns-hijack 可以正常生效'
---

为了更好的搭配 `clash tun` 模式使用，我这里决定修改 SteamDeck 的 DNS，使其指向外部的 DNS 地址而不是内网自动分配的地址，这样 `clash tun` 模式下的 `dns-hijack` 就可以正常生效

## 修改 `/etc/NetworkManager/conf.d/dns.conf`

通过 `/etc/resolve.conf` 文件的注释可知它已经被 `NetworkManager` 接管，所以这里我们需要执行以下命令修改 `NetworkManager` 的 dns 配置，使其不要继续接管：

```bash
sudo vim /etc/NetworkManager/conf.d/dns.conf
```

将 `dns` 配置改为 `none` 即可：

```bash
[main]
#dns=systemd-resolved
dns=none
```

最后我们重启 `NetworkManager` 服务：

```bash
systemctl restart NetworkManager.service
```

## 修改 `/etc/resolv.conf`

打开终端执行以下命令：

```bash
sudo vim /etc/resolv.conf
```

将其中的 `nameserver` 改为以下内容即可：

```bash
#nameserver 127.0.0.53
nameserver 8.8.8.8
nameserver 114.114.114.114
```

我们可以通过 `dig baidu.com` 来判断是否生效:

```bash
;; Query time: 0 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Sun Oct 09 15:26:43 CST 2022
;; MSG SIZE  rcvd: 88
```

**PS** 如果提示 `dig` 命令不存在，需要手动安装，`Archlinux` 下可以执行此命令安装 `sudo pacman -S net-tools dnsutils inetutils iproute2`

这样我们就完成了对dns的修改
