#!/bin/sh

rm -rf dist
rm -rf dist.zip

npm run build
zip -r dist.zip dist
rm -rf /private/tftpboot/dist.*
cp -af dist.zip /private/tftpboot/
