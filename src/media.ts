/**
 * 视频不随站点打包，走外部对象存储（GitHub Release 资源）。
 *
 * 换存储服务商（Cloudflare R2 / 腾讯云 COS）时只改这一行 ——
 * 其余代码都通过 mediaUrl() 取地址，不用满仓库找文件名。
 */
export const MEDIA_BASE =
  'https://github.com/jiyanglu04-oss/jiyanglu04-oss.github.io/releases/download/media-v1/';

export const mediaUrl = (file: string) =>
  /^https?:\/\//i.test(file) ? file : `${MEDIA_BASE}${file}`;
