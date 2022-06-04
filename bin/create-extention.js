#!/usr/bin/env node

import("../lib/index.js")
    .then(createExtention => {
        createExtention;
    });