// Primitive configurations
var config = {
    APP_DNS  : process.env.OPENSHIFT_DNS || "localhost:1337"
  , APP_IP   : process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"
  , APP_PORT : process.env.OPENSHIFT_NODEJS_PORT || "1337"

  , DB_HOST  : process.env.OPENSHIFT_MONGODB_DB_HOST || "localhost"
  , DB_PORT  : process.env.OPENSHIFT_MONGODB_DB_PORT || "27017"
  , DB_USER  : process.env.OPENSHIFT_MONGODB_DB_USERNAME || ""
  , DB_PASS  : process.env.OPENSHIFT_MONGODB_DB_PASSWORD || ""
  , DB_NAME  : "palantiri"
}

// Constructed configurations
config.DB_PATH = (config.DB_USER ? config.DB_USER + ":" + config.DB_PASS + "@" : "") +
                  config.DB_HOST + ":" + config.DB_PORT + "/" + config.DB_NAME

module.exports = config;
