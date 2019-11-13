#!/bin/bash

NODE_ENV=production node ./server.api.js &
NODE_ENV=production node ./server.guard.js

