const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

const manifest = {
    id: "community.urduhindiaddon",
    version: "1.0.0",
    name: "Urdu Hindi Cinema",
    description: "Free Movies & Web Series Addon",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    try {
        const url = `https://torrentio.strem.fun/sort=qualitysize|qualityfilter=480p,720p,1080p/${type}/${id}.json`;
        const response = await axios.get(url);

        return {
            streams: response.data.streams
        };

    } catch (e) {
        return {
            streams: []
        };
    }
});

serveHTTP(builder.getInterface(), { port: process.env.PORT || 7000 });
