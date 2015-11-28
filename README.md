# base64-keeper

Quick server to post base64 images and send to filesytem.

## Configure
Just clone this repo, and create a `config.json` from `config.json.sample` with your configs.  

The request to this server must be done as a POST to the root with a body having a secret and the base64 image string as:
```javascript
{
  "secret": "you-secret-at-config.json",
  "base64": "XXXYYYY",
  "extension": "jpg" // default "png"
}
```

## Install and start Server
Install dependencies with:
```bash
npm install
```

Start server by (default port is 5000)
```bash
npm start
```
or
```bash
PORT=5003 node index.js
```

### Licence BSD-3-Clause
Check LICENSE file for details
