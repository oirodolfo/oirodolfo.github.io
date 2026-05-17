# Code Pretty Offline PWA

Deploy these files at the root of your GitHub Pages site:

- `index.html`
- `sw.js`
- `manifest.webmanifest`

## URL inputs

Open remote raw code:

```txt
https://your-user.github.io/your-repo/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fuser%2Frepo%2Fmain%2Ffile.ts&lang=typescript
```

Open code embedded in URL:

```txt
https://your-user.github.io/your-repo/#lang=zsh&b64=<base64url>
```

Inside the app, use **Code URL** to generate this URL automatically.

## Offline

Open the site once online. The Service Worker caches the app shell and CDN modules. Then open again from Safari Home Screen while offline.
