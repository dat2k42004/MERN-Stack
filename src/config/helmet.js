const helmet = require("helmet");

const helmetConfig = helmet({
     contentSecurityPolicy: false,

     crossOriginOpenerPolicy: {
          policy: "same-origin"
     },

     crossOriginResourcePolicy: {
          policy: "same-origin"
     },

     originAgentCluster: true,

     referrerPolicy: {
          policy: "no-referrer"
     },

     frameguard: {
          action: "deny"
     },

     dnsPrefetchControl: {
          allow: false
     },
     permittedCrossDomainPolicies: {
          policy: "none"
     },

     xssFilter: true,

     hidePoweredBy: true,

     hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
     },

     noSniff: true,
});

module.exports = helmetConfig;